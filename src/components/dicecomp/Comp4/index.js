import React from "react";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";

class DiceRoller extends React.Component {
  render() {
    return (
      <div>
        <ReactDice
          ref={this.props.innerRef}
          numDice={1}
          rollTime={2}
          rollDone={this.props.onRollerStop}
          disableIndividual={true}
        />
      </div>
    );
  }
}
// export default DiceRoller;
export default React.forwardRef((props, ref) => (
  <DiceRoller innerRef={ref} {...props} />
));
