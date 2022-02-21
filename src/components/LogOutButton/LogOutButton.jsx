import React from 'react';
import { useDispatch } from 'react-redux';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';


function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <ExitToAppOutlinedIcon
          // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      className="logout"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    />
  );
}

export default LogOutButton;
