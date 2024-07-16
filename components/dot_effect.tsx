import React, { useCallback, useState } from "react";

interface DotEffectProps {
    disabled?: boolean; 
    children: React.ReactElement | [React.ReactElement, ...React.ReactElement[]]
}

export default function DotEffect({disabled, children}:DotEffectProps){
    const [maskPosition, setMaskPosition] = useState<[number, number]>([0, 0])
    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = event;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
        // Calculate mouse position relative to the element
        const x = clientX - left;
        const y = clientY - top;
    
        setMaskPosition([x, y]);
      }, []);
    
    if(disabled === true){
        return children
    }
    
    return(
        <>
        {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                style: {"--mask-position": `${maskPosition[0]}px ${maskPosition[1]}px`, "boxShadow": `inset ${maskPosition[0] / Math.sqrt(maskPosition[0] ** 2 + maskPosition[1] ** 2 )}px ${maskPosition[1] / Math.sqrt(maskPosition[0] ** 2 + maskPosition[1] ** 2 )}px 10px -5px hsl(var(--border))`},
                onMouseMove:handleMouseMove,
              });
            }
            return child;
          })}
        </>
    )
}