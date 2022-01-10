import * as React from "react";

const getMouseXPosInBoundingRect = event => event.clientX - event.currentTarget.getBoundingClientRect().left;

const ContentItemGenerator = ({str}) => (
    <div className="content-item">
        {str}
    </div>
);

const DemoComponent = (): JSX.Element => {
    
    const [mouseDownVal, setMouseDownVal] = React.useState<number>();
    const [mouseDownOnSlider, setMouseDownOnSlider] = React.useState(false);
    const [contentScrollLeft, setContentScrollLeft] = React.useState(0);

    const contentWidth = 1100; // this should be calculated from the individual content widths or retrieved from the width of the rendered content wrapper.
    const contentViewWidth = 870; // may be set or retrieved from the rendered component
    const sliderTrackLength = 900;  // may be set or retrieved from the rendered component
    const viewToWidthRatio = contentViewWidth / contentWidth;
    const totalOverflowLength = contentWidth - contentViewWidth;
    const sliderLength = sliderTrackLength * viewToWidthRatio;  // width of slider to width of total bar is a ratio proportional to the ratio of the visible portion of the content bar over the entire width of the content bar
    const maxSlideableDistance = sliderTrackLength - sliderLength;
    const halfSliderLength = sliderLength / 2;
    const maxVal = sliderTrackLength - halfSliderLength;
    const minMaxRange = maxVal - halfSliderLength;
    const rangeToOverflowRatio = minMaxRange / totalOverflowLength;
    const fractionScrolled = contentScrollLeft < totalOverflowLength ? contentScrollLeft / totalOverflowLength : 1;
    const sliderPosition = Math.max(0, (fractionScrolled * maxSlideableDistance)); // position of the scroll bar in its parent container is proportional to the position of the viewed portion of the content strip over the entire width of the content strip

    const transformSliderBarVal = (num: number) => ((num <= halfSliderLength ? halfSliderLength : num >= maxVal ? maxVal : num) - halfSliderLength) / rangeToOverflowRatio;

    const contentArr = [ // 11 items is 1100 px total width for the content
        "Content",
        "Content",
        "Content",
        "Content",
        "Content",
        "Content",
        "Content",
        "Content",
        "Content",
        "Content",
        "Content"
    ];
    
    return (
        <>
            <h1>Demo Fakebar</h1>
            <br />
            <br />
            <br />
            <br />
            <h4>Content container</h4>
            <div
                className="content-view-container"
                onWheel={(e) => setContentScrollLeft(Math.max(0, Math.min( totalOverflowLength, contentScrollLeft + e.deltaX)))}
                onMouseDown={(e) => setMouseDownVal(getMouseXPosInBoundingRect(e) + contentScrollLeft)}
                onMouseUp={(e) => setMouseDownVal(undefined)}
                onMouseMove={(e) => {
                    if (mouseDownVal >= 0) {
                        const newLeftVal = Math.min(totalOverflowLength, mouseDownVal - getMouseXPosInBoundingRect(e));
                        setContentScrollLeft(Math.max(0, newLeftVal));                        
                    }
                }}
                style={{ width: contentViewWidth }}>
                    <div className="content-wrapper" /* Content Wrapper */
                        style={{
                            width: contentWidth,
                            left: -contentScrollLeft
                    }}
                    >
                        {contentArr.map((x, i) => <ContentItemGenerator key={i} str={x}/>)}
                    </div>
            </div>
            <h4>fake scrollbar slider</h4>
            <div
                className="slider-track"
                onMouseDown={(e) => {
                    setMouseDownOnSlider(true);
                    // set content scroll left such that the slider's midpoint will be where the user clicked, if possible
                    // the only time val will be something besides the min or max will be when the slider midpoint is able to where the user clicked.
                    // which means the mid point (i.e., the clicked point) should be on [sliderLength / 2, tracklength - (sliderlength / 2)]
                    setContentScrollLeft(transformSliderBarVal(getMouseXPosInBoundingRect(e)));
                }}
                onMouseUp={(e) => setMouseDownOnSlider(false)}
                onMouseMove={(e) => {
                    if (mouseDownOnSlider) {
                        setContentScrollLeft(transformSliderBarVal(getMouseXPosInBoundingRect(e)));
                    }
                }}
                style={{
                    width: sliderTrackLength
                    }}>
                <div
                    className="slider"
                    style={{
                        width: sliderLength,
                        left: sliderPosition
                    }} />
            </div>
        </>
    );
}

export default DemoComponent;
