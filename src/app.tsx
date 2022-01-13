import * as React from "react";
import HorizontalScroller from "./demo_component";
import VerticalScroller from "./vertical_scroller";

export const App = (): JSX.Element => {
    const [scrollLock, setScrollLock] = React.useState(false);

    React.useLayoutEffect(() => {
        if (scrollLock) {
            // Get original body overflow
            const originalOverflowStyle = window.getComputedStyle(document.body).overflowY;
            document.body.style.overflowY = 'hidden';   // simple method of disabling scroll
            // Re-enable scrolling when callback is invoked by returning a callback.
            return (): void => {
                document.body.style.overflowY = originalOverflowStyle; // if the original style on body was "overlay" then there shouldn't be any layout thrashing.
            }
        }
    }, [scrollLock]);
    
    return (
        <div className="container">
            <VerticalScroller setScrollLock={setScrollLock} />
            <HorizontalScroller />
        </div>
    );
}