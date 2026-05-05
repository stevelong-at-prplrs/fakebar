import * as React from "react";

type Orientation = "horizontal" | "vertical";

interface ScrollerProps {
    orientation: Orientation;
    title: string;
    contentItems: string[];
    contentSize: number;
    contentViewSize: number;
    sliderTrackLength: number;
    setScrollLock?: (lock: boolean) => void;
}

const Scroller = ({
    orientation,
    title,
    contentItems,
    contentSize,
    contentViewSize,
    sliderTrackLength,
    setScrollLock,
}: ScrollerProps): JSX.Element => {

    const isHorizontal = orientation === "horizontal";

    const [mouseDownVal, setMouseDownVal] = React.useState<number>();
    const [mouseDownOnSlider, setMouseDownOnSlider] = React.useState(false);
    const [contentScroll, setContentScroll] = React.useState(0);

    const getMousePosInBoundingRect = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        return isHorizontal ? event.clientX - rect.left : event.clientY - rect.top;
    };

    const viewToSizeRatio = contentViewSize / contentSize;
    const totalOverflow = contentSize - contentViewSize;
    const sliderLength = sliderTrackLength * viewToSizeRatio;
    const maxSlideableDist = sliderTrackLength - sliderLength;
    const halfSliderLength = sliderLength / 2;
    const maxSliderVal = sliderTrackLength - halfSliderLength;
    const adjSliderRange = maxSliderVal - halfSliderLength;
    const sliderRangeToOverflow = adjSliderRange / totalOverflow;
    const fractionScrolled = contentScroll < totalOverflow ? contentScroll / totalOverflow : 1;
    const sliderPosition = Math.max(0, fractionScrolled * maxSlideableDist);

    const transformSliderBarVal = (num: number) =>
        ((num <= halfSliderLength ? halfSliderLength : num >= maxSliderVal ? maxSliderVal : num) - halfSliderLength) / sliderRangeToOverflow;

    const classes = isHorizontal
        ? { view: "content-view-container", wrapper: "content-wrapper", item: "content-item", track: "slider-track", slider: "slider" }
        : { view: "content-view-container-vert", wrapper: "content-wrapper-vert", item: "content-item-vert", track: "slider-track-vert", slider: "slider-vert" };

    const isDragging = mouseDownVal !== undefined;
    const viewStyle: React.CSSProperties = {
        ...(isHorizontal ? { width: contentViewSize } : { height: contentViewSize }),
        cursor: isDragging ? "grabbing" : "grab",
    };
    const wrapperStyle: React.CSSProperties = isHorizontal
        ? { width: contentSize, left: -contentScroll }
        : { height: contentSize, top: -contentScroll };
    const trackStyle: React.CSSProperties = isHorizontal ? { width: sliderTrackLength } : { height: sliderTrackLength };
    const sliderStyle: React.CSSProperties = isHorizontal
        ? { width: sliderLength, left: sliderPosition }
        : { height: sliderLength, top: sliderPosition };

    const contentView = (
        <div
            className={classes.view}
            onMouseOver={setScrollLock ? () => setScrollLock(true) : undefined}
            onMouseOut={setScrollLock ? () => setScrollLock(false) : undefined}
            onWheel={(e) => setContentScroll(Math.max(0, Math.min(totalOverflow, contentScroll + (isHorizontal ? e.deltaX : e.deltaY))))}
            onMouseDown={(e) => setMouseDownVal(getMousePosInBoundingRect(e) + contentScroll)}
            onMouseUp={() => setMouseDownVal(undefined)}
            onMouseMove={(e) => {
                if (mouseDownVal !== undefined && mouseDownVal >= 0) {
                    const newVal = Math.min(totalOverflow, mouseDownVal - getMousePosInBoundingRect(e));
                    setContentScroll(Math.max(0, newVal));
                }
            }}
            style={viewStyle}>
                <div className={classes.wrapper} style={wrapperStyle}>
                    {contentItems.map((x, i) => (
                        <div key={i} className={classes.item}>{x}</div>
                    ))}
                </div>
        </div>
    );

    const sliderTrack = (
        <div
            className={classes.track}
            onMouseDown={(e) => {
                setMouseDownOnSlider(true);
                // set content scroll such that the slider's midpoint will be where the user clicked, if possible
                // the only time val will be something besides the min or max will be when the slider midpoint is able to where the user clicked.
                // which means the mid point (i.e., the clicked point) should be on [sliderLength / 2, tracklength - (sliderlength / 2)]
                setContentScroll(transformSliderBarVal(getMousePosInBoundingRect(e)));
            }}
            onMouseUp={() => setMouseDownOnSlider(false)}
            onMouseMove={(e) => {
                if (mouseDownOnSlider) {
                    setContentScroll(transformSliderBarVal(getMousePosInBoundingRect(e)));
                }
            }}
            style={trackStyle}>
            <div className={classes.slider} style={sliderStyle} />
        </div>
    );

    return (
        <>
            <h1>{title}</h1>
            <br />
            <br />
            <br />
            <br />
            <h4>Content container</h4>
            {isHorizontal ? (
                <>
                    {contentView}
                    {sliderTrack}
                </>
            ) : (
                <div className="row">
                    <div className="col">{contentView}</div>
                    <div className="col-1">{sliderTrack}</div>
                </div>
            )}
        </>
    );
};

export default Scroller;
