import * as React from "react";
import { Typography } from "antd/lib"
import { Navigatable } from "../common/navigation"
const { Title, Text } = Typography

interface Props extends Navigatable {}
interface State {}
export class NotFound extends React.Component<Props, State> {
    render() {
        return <div>
            <Text>Page not found :(</Text>
        </div>
    }
}
