import { useParams } from "react-router";

interface RouteParams {
    univName: string;
}
function Univ() {
    const {univName} = useParams<RouteParams>();
    return <h1>{univName} 근처 맛집 찾기</h1>;
}

export default Univ;