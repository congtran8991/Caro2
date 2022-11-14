import { notification } from "antd"
import PropTypes from "prop-types"


const Notification = (props) => {
    const { type, message, description, config = {} } = props
    notification.config(config);
    notification[type]({
      message,
      description,
      duration: 1
    });
  };

Notification.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    description: PropTypes.string
}

export default Notification