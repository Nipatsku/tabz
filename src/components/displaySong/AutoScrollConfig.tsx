import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input, Tooltip, Slider } from "antd/lib"
import { AutoScrollValues, AutoScrollSpeed, saveSongAutoScrollSpeed } from "../../datastructures/autoScroll"
import { SliderValue } from "antd/lib/slider";
import { lerp } from "../../utils"
const { Title, Text } = Typography

interface Props {
    songVersion: SongVersion
    enabled: boolean
    autoScrollSpeed: AutoScrollSpeed
    onToggle: () => void
    onSetSpeed: (autoScrollSpeed: AutoScrollSpeed) => void
}
interface State {}
export class AutoScrollConfig extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    onSliderChange = (value: SliderValue) => {
        this.props.onSetSpeed(_sliderValueToAutoScrollSpeed(value as number))
    }
    afterSliderChange = (value: SliderValue) => {
        // Save preference.
        saveSongAutoScrollSpeed(
            this.props.songVersion,
            _sliderValueToAutoScrollSpeed(value as number)
        )
    }
    render() {
        const { enabled, autoScrollSpeed, onToggle } = this.props
        return <div>
            <Tooltip
                title="Also activated by poking / double-clicking anywhere!"
                mouseEnterDelay={1}
            >
                <Button
                    onClick={onToggle}
                    type={enabled ? "primary" : "default"}
                >
                    {`Autoscroll ${ enabled ? "ON" : "OFF" }`}
                </Button>
            </Tooltip>
            <Slider
                className="autoScrollSlider"
                min={0}
                max={100}
                value={_autoScrollSpeedToSliderValue(autoScrollSpeed)}
                marks={{
                    [_autoScrollSpeedToSliderValue(AutoScrollValues.default)]: ""
                }}
                onChange={this.onSliderChange}
                onAfterChange={this.afterSliderChange}
            />
            <div
                className="autoScrollValueDiv"
            >
                <Text
                    className="autoScrollValueLabel"
                >
                    {
                    // tslint:disable-next-line: max-line-length
                    `${Math.floor(autoScrollSpeed / 60)} min ${Math.floor(autoScrollSpeed) % 60 > 0 ? Math.floor(autoScrollSpeed) % 60 + " sec" : ""}`
                    }
                </Text>
            </div>
        </div>
    }
}
const _autoScrollSpeedToSliderValue = (autoScrollSpeed: AutoScrollSpeed): number => lerp(
    (autoScrollSpeed - AutoScrollValues.min) / (AutoScrollValues.max - AutoScrollValues.min),
    0,
    100
)
const _sliderValueToAutoScrollSpeed = (sliderValue: number): AutoScrollSpeed => lerp(
    (sliderValue as number) / 100,
    AutoScrollValues.min,
    AutoScrollValues.max
)
