
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:font-semibold",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  // Create a ref to scroll the heading into view when the tab is active
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const checkActive = () => {
      if (contentRef.current) {
        const isCurrentActive = contentRef.current.getAttribute('data-state') === 'active';
        if (isCurrentActive && !isActive) {
          setIsActive(true);
          
          // Find the first heading element in the content and scroll to it
          const headingElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
          if (headingElements.length > 0) {
            // Add a small delay to ensure DOM is ready
            setTimeout(() => {
              // Calculate offset for header height (adjust the 80px value as needed based on your header height)
              const headerOffset = 80;
              const elementPosition = headingElements[0].getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              // Scroll with offset to ensure the heading is visible below the fixed header
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }, 100);
          }
        } else if (!isCurrentActive && isActive) {
          setIsActive(false);
        }
      }
    };

    // Check initially
    checkActive();

    // Set up a mutation observer to detect when the data-state attribute changes
    if (contentRef.current) {
      const observer = new MutationObserver(checkActive);
      observer.observe(contentRef.current, { attributes: true, attributeFilter: ['data-state'] });
      
      return () => observer.disconnect();
    }
  }, [isActive]);

  return (
    <TabsPrimitive.Content
      ref={(node) => {
        // Handle both the forwardRef and our own ref
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
        contentRef.current = node;
      }}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
})

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
