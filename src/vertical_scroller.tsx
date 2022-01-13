import * as React from "react";

const getMouseYPosInBoundingRect = event => event.clientY - event.currentTarget.getBoundingClientRect().top;

const ContentItemGenerator = ({str}) => (
    <div className="content-item-vert">
        {str}
    </div>
);

const VerticalScroller = ({ setScrollLock }): JSX.Element => {
    
    const [mouseDownVal, setMouseDownVal] = React.useState<number>();
    const [mouseDownOnSlider, setMouseDownOnSlider] = React.useState(false);
    const [contentScrollTop, setContentScrollTop] = React.useState(0);

    const contentArr = [ // 40 items tall times 1.5 rem (24 px each) = 240 x 4 = 800 + 160 = 960
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
    ];

    const contentHeight = contentArr.length * 24; // this should be calculated from the individual content widths or retrieved from the width of the rendered content wrapper.
    const contentViewHeight = 870; // may be set or retrieved from the rendered component
    const sliderTrackLength = 870;  // may be set or retrieved from the rendered component
    const viewToHeightRatio = contentViewHeight / contentHeight;
    const totalOverflow = contentHeight - contentViewHeight;
    const sliderLength = sliderTrackLength * viewToHeightRatio;  // width of slider to width of total bar is a ratio proportional to the ratio of the visible portion of the content bar over the entire width of the content bar
    const maxSlideableDist = sliderTrackLength - sliderLength;
    const halfSliderLength = sliderLength / 2;
    const maxSliderVal = sliderTrackLength - halfSliderLength;
    const adjSliderRange = maxSliderVal - halfSliderLength;
    const sliderRangeToOverflow = adjSliderRange / totalOverflow;
    const fractionScrolled = contentScrollTop < totalOverflow ? contentScrollTop / totalOverflow : 1;
    const sliderPosition = Math.max(0, (fractionScrolled * maxSlideableDist)); // position of the scroll bar in its parent container is proportional to the position of the viewed portion of the content strip over the entire width of the content strip

    const transformSliderBarVal = (num: number) => ((num <= halfSliderLength ? halfSliderLength : num >= maxSliderVal ? maxSliderVal : num) - halfSliderLength) / sliderRangeToOverflow;
    
    return (
        <>
            <h1>Demo Fakebar - vertical</h1>
            <br />
            <br />
            <br />
            <br />
            <h4>Content container</h4>
            <div className="row">
                <div className="col">
                    <div
                    className="content-view-container-vert"
                    onMouseOver={() => setScrollLock(true)}
                    onMouseOut={() => setScrollLock(false)}
                    onWheel={(e) => setContentScrollTop(Math.max(0, Math.min( totalOverflow, contentScrollTop + e.deltaY)))}
                    onMouseDown={(e) => setMouseDownVal(getMouseYPosInBoundingRect(e) + contentScrollTop)}
                    onMouseUp={(e) => setMouseDownVal(undefined)}
                    onMouseMove={(e) => {
                        if (mouseDownVal >= 0) {
                            const newLeftVal = Math.min(totalOverflow, mouseDownVal - getMouseYPosInBoundingRect(e));
                            setContentScrollTop(Math.max(0, newLeftVal));                        
                        }
                    }}
                    style={{ height: contentViewHeight }}>
                        <div className="content-wrapper-vert" /* Content Wrapper */
                            style={{
                                height: contentHeight,
                                top: -contentScrollTop
                        }}
                        >
                            {contentArr.map((x, i) => <ContentItemGenerator key={i} str={x}/>)}
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <div
                        className="slider-track-vert"
                        onMouseDown={(e) => {
                            setMouseDownOnSlider(true);
                            // set content scroll top such that the slider's midpoint will be where the user clicked, if possible
                            // the only time val will be something besides the min or max will be when the slider midpoint is able to where the user clicked.
                            // which means the mid point (i.e., the clicked point) should be on [sliderLength / 2, tracklength - (sliderlength / 2)]
                            setContentScrollTop(transformSliderBarVal(getMouseYPosInBoundingRect(e)));
                        }}
                        onMouseUp={(e) => setMouseDownOnSlider(false)}
                        onMouseMove={(e) => {
                            if (mouseDownOnSlider) {
                                setContentScrollTop(transformSliderBarVal(getMouseYPosInBoundingRect(e)));
                            }
                        }}
                        style={{
                            height: sliderTrackLength
                            }}>
                        <div
                            className="slider-vert"
                            style={{
                                height: sliderLength,
                                top: sliderPosition
                            }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerticalScroller;