import * as React from "react";
import Scroller from "./scroller";

const verticalContent = [...Array(40)].map(() => "Content");
const horizontalContent = [...Array(11)].map(() => "Content");

export const App = (): JSX.Element => {
    return (
        <div className="container" style={{ marginBottom: "2rem"}}>
            <Scroller
                orientation="vertical"
                title="Demo Fakebar - vertical"
                contentItems={verticalContent}
                contentSize={verticalContent.length * 24}
                viewHeight={500}
            />
            <Scroller
                orientation="horizontal"
                title="Demo Fakebar - horizontal"
                contentItems={horizontalContent}
                contentSize={horizontalContent.length * 100}
                viewWidth={800}
                viewHeight={100}
            />
        </div>
    );
}
