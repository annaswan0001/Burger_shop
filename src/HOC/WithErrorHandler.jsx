import React from "react";
import Modal from "../components/UI/Modal/Modal";
import { useHttpErrorHandler } from "../customHook/showErroHook";


const checkStatus = (error, message) =>{
      console.log("hekkkk")
  switch (error.response.status) {

    case 401:
      message = "Unauthorized"; //	"Неавторизовано". Для получения запрашиваемого ответа нужна аутентификация.
      break;
    case 403:
      message = "Forbidden"; //	"Запрещено". У клиента нет прав доступа к содержимому, поэтому сервер отказывается дать надлежащий ответ.
      break;
    case 404:
      message = "Not found"; //Не найден". Сервер не может найти запрашиваемый ресурс.
      break;
    case 500:
      message = "Server problem"; //"Внутренняя ошибка сервера". Сервер столкнулся с ситуацией, которую он не знает как обработать.
      break;
    default:
      break;
  }
  return message
}


const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);
    let message = null;
    if ((error && error.response) || {}.status) {
      message = checkStatus (error, message)
    } 
    return (
      <React.Fragment>
        {error && error.response ? (
          <Modal show={error} modalClosed={errorConfirmedHandler}>
            {message}
          </Modal>
        ) : null}
        {error && !error.response ? (
          <Modal show={error} modalClosed={errorConfirmedHandler}>
            {"No error message"}
          </Modal>
        ) : null}
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
