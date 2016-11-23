import * as types from './actionConstants';

export default function beginAjaxCall(){
  return {
    type: types.BEGIN_AJAX_CALL
  };
}
export function errorAjaxCall(){
  return {
    type: types.AJAX_CALL_ERROR
  };
}
