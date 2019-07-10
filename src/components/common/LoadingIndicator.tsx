import * as React from "react";
import { Spin } from "antd/lib"

interface Props {}
interface State {}
export class LoadingIndicator extends React.Component<Props, State> {
    render() {
        return <Spin
            size="large"
            className="absolute-center"
        />
    }
}
