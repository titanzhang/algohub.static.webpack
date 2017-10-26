import './CommentForm.css';
import Utils from './common';

const Text = {
  MSG_SUBMIT_SUCCESS: 'Your comment has benn successfully submitted!',
  MSG_SUBMIT_FAIL: '<strong>Error!</strong> Failed to submit your comment'
};

const State = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

const MessageType = {
  SUCCESS: 'alert-success',
  DANGER: 'alert-danger'
};

class CommentForm {
  init({formID, fieldIDs, messageID, userObj}) {
    if (!formID || !fieldIDs || !messageID || !userObj) throw new Error('CommentForm::Init error');
    this.formObj = $(`#${formID}`);
    this.messageObj = $(`#${messageID}`);
    this.userObj = userObj;
    this.inputs = [];
    for (const id of fieldIDs) {
      this.inputs.push($(`#${id}`));
    }

    this.formObj.submit(this.onSubmit());
  }

  checkValue() {
    let result = true;
    for (const obj of this.inputs) {
      if (obj.val().trim().length == 0) {
        this.setState({
          node: obj,
          state: State.ERROR
        });
        result = false;
      } else {
        this.setState({ node: obj });
      }
    }
    return result;
  }

  setState({node, state}) {
    const stateList = [];
    for (const i in State) {
      stateList.push(`has-${State[i]}`);
    }
    const allStates = stateList.join(' ');

    node.parent().removeClass(allStates);
    if (state) {
      node.parent().addClass(`has-${state}`);
    }
  }

  clearStates() {
    for (const node of this.inputs) {
      this.setState({
        node: node
      });
    }
  }

  showMessage({message, type, timeout=10}) {
    if (type) {
      const typeList = [];
      for (const i in State) {
        typeList.push(State[i]);
      }
      const allTypes = typeList.join(' ');

      this.messageObj.removeClass(allTypes).addClass(type);
    }

    if (message) {
      this.messageObj.html(message);
    }

    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = undefined;
    }

    return new Promise((resolve) => {
      this.messageObj.show();
      this.timeoutHandler = setTimeout( () => {
        this.messageObj.hide();
        resolve();
      }, timeout * 1000);
    });
  }

  onSubmit() {
    return (event) => {
      ( async () => {
        if (!this.checkValue()) {
          return;
        }
        this.clearStates();

        const loginResult = await this.userObj.login();
        if (!loginResult) {
          return;
        }

        const data = await Utils.post(
          this.formObj.attr('action'),
          this.formObj.serialize()
        );

        if (!data.status) {
          return this.showMessage({
            message: Text.MSG_SUBMIT_FAIL,
            type: MessageType.DANGER
          });
        }
        return this.showMessage({
          message: Text.MSG_SUBMIT_SUCCESS,
          type: MessageType.SUCCESS
        });


      })();
      event.preventDefault();
    };
  }
}

export default CommentForm;
