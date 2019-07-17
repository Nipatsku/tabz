import * as React from "react";
import { Typography } from "antd/lib"
const { Title, Text } = Typography

interface Props {}
interface State {}
export class NotFound extends React.Component<Props, State> {
    render() {
        return <div>
            <Text>Page not found :(</Text>
        </div>
    }
}
