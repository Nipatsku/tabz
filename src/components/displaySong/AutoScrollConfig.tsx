import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input, Tooltip } from "antd/lib"
const { Title, Text } = Typography

interface Props {
    enabled: boolean
    onToggle: () => void
}
interface State {}
export class AutoScrollConfig extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    render() {
        const { enabled, onToggle } = this.props
        return <div>
            <Tooltip
                title="Also activated by poking / double-clicking !"
                mouseEnterDelay={1}
            >
                <Button
                    onClick={onToggle}
                    type={enabled ? 'primary':'default'}
                >
                    {`Autoscroll ${ enabled ? 'ON' : 'OFF' }`}
                </Button>
            </Tooltip>
        </div>
    }
}