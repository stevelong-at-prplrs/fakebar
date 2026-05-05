import * as React from "react";
import Scroller from "./scroller";

const verticalContent = [...Array(40)].map(() => "Content");
const horizontalContent = [...Array(11)].map(() => "Content");

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
        <div className="container" style={{ marginBottom: "2rem"}}>
            <Scroller
                orientation="vertical"
                title="Demo Fakebar - vertical"
                contentItems={verticalContent}
                contentSize={verticalContent.length * 24}
                contentViewSize={500}
                setScrollLock={setScrollLock}
            />
            <Scroller
                orientation="horizontal"
                title="Demo Fakebar - horizontal"
                contentItems={horizontalContent}
                contentSize={horizontalContent.length * 100}
                contentViewSize={500}
            />
        </div>
    );
}
