// Screenshot protection utility
export class ScreenshotProtection {
  private static instance: ScreenshotProtection;
  private isProtectionActive = false;
  private observers: MutationObserver[] = [];

  private constructor() {
    this.initProtection();
  }

  public static getInstance(): ScreenshotProtection {
    if (!ScreenshotProtection.instance) {
      ScreenshotProtection.instance = new ScreenshotProtection();
    }
    return ScreenshotProtection.instance;
  }

  private initProtection(): void {
    // Detect print screen attempts
    this.detectPrintScreen();
    
    // Detect developer tools
    this.detectDevTools();
    
    // Detect visibility changes (screenshot tools often hide the window)
    this.detectVisibilityChange();
    
    // Detect right-click context menu
    this.preventContextMenu();
    
    // Detect keyboard shortcuts
    this.detectKeyboardShortcuts();

    // Setup context menu protection
    this.setupContextMenuProtection();
  }

  private detectPrintScreen(): void {
    // Listen for print events
    window.addEventListener('beforeprint', () => {
      this.activateProtection();
    });

    window.addEventListener('afterprint', () => {
      this.deactivateProtection();
    });
  }

  private detectDevTools(): void {
    // Detect if developer tools are open
    let devtools = { open: false, orientation: null };
    
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 || 
          window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
          devtools.open = true;
          this.activateProtection();
        }
      } else {
        if (devtools.open) {
          devtools.open = false;
          this.deactivateProtection();
        }
      }
    }, 500);
  }

  private detectVisibilityChange(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.activateProtection();
        // Keep protection active for a short time after visibility returns
        setTimeout(() => {
          if (!document.hidden) {
            this.deactivateProtection();
          }
        }, 2000);
      }
    });
  }

  private preventContextMenu(): void {
    document.addEventListener('contextmenu', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.screenshot-protection')) {
        e.preventDefault();
        return false;
      }
    });
  }

  private detectKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      // Detect common screenshot shortcuts
      const forbiddenKeys = [
        // Print Screen
        { key: 'PrintScreen' },
        // Alt + Print Screen
        { key: 'PrintScreen', altKey: true },
        // Windows + Print Screen
        { key: 'PrintScreen', metaKey: true },
        // Ctrl + Shift + S (Firefox screenshot)
        { key: 'S', ctrlKey: true, shiftKey: true },
        // Cmd + Shift + 3/4/5 (Mac screenshots)
        { key: '3', metaKey: true, shiftKey: true },
        { key: '4', metaKey: true, shiftKey: true },
        { key: '5', metaKey: true, shiftKey: true },
        // F12 (Developer tools)
        { key: 'F12' },
        // Ctrl + Shift + I (Developer tools)
        { key: 'I', ctrlKey: true, shiftKey: true },
        // Ctrl + Shift + J (Console)
        { key: 'J', ctrlKey: true, shiftKey: true },
        // Ctrl + Shift + C (Element inspector)
        { key: 'C', ctrlKey: true, shiftKey: true },
        // Ctrl + U (View source)
        { key: 'U', ctrlKey: true },
        // Ctrl + S (Save page)
        { key: 'S', ctrlKey: true },
        // Ctrl + A (Select all)
        { key: 'A', ctrlKey: true },
        // Ctrl + P (Print)
        { key: 'P', ctrlKey: true }
      ];

      const isMatch = forbiddenKeys.some(combo => {
        return combo.key === e.key &&
               (combo.ctrlKey === undefined || combo.ctrlKey === e.ctrlKey) &&
               (combo.altKey === undefined || combo.altKey === e.altKey) &&
               (combo.shiftKey === undefined || combo.shiftKey === e.shiftKey) &&
               (combo.metaKey === undefined || combo.metaKey === e.metaKey);
      });

      if (isMatch) {
        e.preventDefault();
        this.activateProtection();
        
        // Show warning message
        this.showProtectionWarning();
        
        // Deactivate after a delay
        setTimeout(() => {
          this.deactivateProtection();
        }, 3000);
        
        return false;
      }
    });
  }

  private activateProtection(): void {
    if (this.isProtectionActive) return;
    
    this.isProtectionActive = true;
    
    // Apply blur and low quality to all auction/artwork images
    const protectedImages = document.querySelectorAll('img[src*="auction"], img[src*="artwork"], img[alt*="auction"], img[alt*="artwork"]');
    protectedImages.forEach((img: Element) => {
      const htmlImg = img as HTMLImageElement;
      htmlImg.style.filter = 'blur(15px) contrast(0.2) brightness(0.3) grayscale(1)';
      htmlImg.style.imageRendering = 'pixelated';
      htmlImg.style.transform = 'scale(0.9)';
      htmlImg.style.transition = 'filter 0.3s ease, transform 0.3s ease';
    });

    // Show overlay patterns
    const overlays = document.querySelectorAll('.screenshot-overlay');
    overlays.forEach((overlay: Element) => {
      const htmlOverlay = overlay as HTMLElement;
      htmlOverlay.style.opacity = '1';
      htmlOverlay.style.background = `
        repeating-linear-gradient(45deg, 
          rgba(255,0,0,0.1), rgba(255,0,0,0.1) 10px, 
          transparent 10px, transparent 20px),
        repeating-linear-gradient(-45deg, 
          rgba(0,0,255,0.1), rgba(0,0,255,0.1) 10px, 
          transparent 10px, transparent 20px)
      `;
    });

    // Add watermark
    this.addWatermark();
  }

  private deactivateProtection(): void {
    if (!this.isProtectionActive) return;
    
    this.isProtectionActive = false;
    
    // Restore original image quality
    const protectedImages = document.querySelectorAll('img[src*="auction"], img[src*="artwork"], img[alt*="auction"], img[alt*="artwork"]');
    protectedImages.forEach((img: Element) => {
      const htmlImg = img as HTMLImageElement;
      htmlImg.style.filter = 'none';
      htmlImg.style.imageRendering = 'auto';
      htmlImg.style.transform = 'scale(1)';
      htmlImg.style.transition = 'filter 0.3s ease, transform 0.3s ease';
    });

    // Hide overlays
    const overlays = document.querySelectorAll('.screenshot-overlay');
    overlays.forEach((overlay: Element) => {
      const htmlOverlay = overlay as HTMLElement;
      htmlOverlay.style.opacity = '0';
    });

    // Remove watermark
    this.removeWatermark();
  }

  private addWatermark(): void {
    // Watermark is now handled by individual image components
    // No global watermark needed
  }

  private removeWatermark(): void {
    // No global watermark to remove
  }

  private showProtectionWarning(): void {
    console.warn('Screenshot protection is active');

    // Create warning toast
    const warning = document.createElement('div');
    warning.innerHTML = '🚫 Screenshot Protection Active - Use Download Button for High Quality Image';
    warning.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 87, 51, 0.95);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      max-width: 300px;
      text-align: center;
    `;

    document.body.appendChild(warning);

    // Remove warning after 4 seconds
    setTimeout(() => {
      if (warning.parentNode) {
        warning.remove();
      }
    }, 4000);
  }

  private setupContextMenuProtection(): void {
    // Disable context menu on all images
    document.addEventListener('contextmenu', (e) => {
      const target = e.target as HTMLElement;

      // Check if right-click is on an image or inside an image container
      if (target.tagName === 'IMG' ||
          target.closest('img') ||
          target.closest('.screenshot-protection') ||
          target.closest('[class*="auction"]') ||
          target.closest('[class*="artwork"]')) {

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        this.activateProtection();
        this.showProtectionWarning();

        setTimeout(() => {
          this.deactivateProtection();
        }, 2000);

        return false;
      }
    }, true); // Use capture phase to catch events early

    // Additional protection for image elements specifically
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }, true);

        // Disable drag and drop
        img.addEventListener('dragstart', (e) => {
          e.preventDefault();
          return false;
        });

        // Disable selection
        img.addEventListener('selectstart', (e) => {
          e.preventDefault();
          return false;
        });
      });
    });
  }

  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Additional global protection functions
const disableImageContextMenu = () => {
  // Disable context menu on all images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }, { capture: true, passive: false });

    img.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    img.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });
  });
};

// Override right-click globally for images
const overrideRightClick = () => {
  document.addEventListener('contextmenu', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG' || target.closest('img')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Show protection message
      const warning = document.createElement('div');
      warning.innerHTML = '🚫 Image protected - Use Download button for high quality';
      warning.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 87, 51, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10001;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        text-align: center;
        animation: fadeIn 0.3s ease-out;
      `;

      document.body.appendChild(warning);

      setTimeout(() => {
        if (warning.parentNode) {
          warning.remove();
        }
      }, 2000);

      return false;
    }
  }, { capture: true, passive: false });
};

// Initialize protection when DOM is loaded
if (typeof window !== 'undefined') {
  // Apply protection immediately if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ScreenshotProtection.getInstance();
      disableImageContextMenu();
      overrideRightClick();
    });
  } else {
    // DOM is already loaded
    ScreenshotProtection.getInstance();
    disableImageContextMenu();
    overrideRightClick();
  }

  // Re-apply protection when new images are added
  const observer = new MutationObserver(() => {
    disableImageContextMenu();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
