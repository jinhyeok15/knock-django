import { Structure, Component } from "../../view.js";

function KeywordDetailContainer() {
  return new Structure('div')
    .setCls('keyword-detail-container');
}

export class KeywordDetail extends Component {
  constructor(props) {
    super(props);
    this.structure = KeywordDetailContainer();
  }
}
