import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input } from "antd/lib"
const { Title, Text } = Typography

interface Props {
    song: Song
    defaultSelectedVersion: SongVersion
    onSelectVersion: (version: SongVersion) => void
}
interface State {}
export class VersionSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    render() {
        const { song, defaultSelectedVersion, onSelectVersion } = this.props
        const { versions } = song
        return <div
            className='versionSelector'
        >
            {versions.length > 1 &&
                <div>
                    {versions.map((version, i) =>
                        <Button
                            key={`${i}`}
                            onClick={() => onSelectVersion(version)}
                            type={version === defaultSelectedVersion ?
                                'primary' : 'default'
                            }
                        >
                            {version.name}
                        </Button>
                    )}
                </div>
            }
        </div>
    }
}