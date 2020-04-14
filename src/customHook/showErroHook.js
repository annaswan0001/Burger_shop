
import {useEffect, useState} from 'react'
export const useHttpErrorHandler= (httpClient) => {
    const [error, setError] = useState(null);

    //Если мы хотим, чтобы ф-ция запускалась до рендеринга(СomponentWillMount -просто добавляем ее в  тело функции без эффектов)
   const requestInterceptor = httpClient.interceptors.request.use((req) => {
     setError(null);
     return req;
   });

   const responceInterceptor = httpClient.interceptors.response.use((res) => res,(err) => {
       setError(err);
     }
   );

   const errorConfirmedHandler = () => {
     setError(null);
   };

   useEffect(() => {
     return () => {
       httpClient.interceptors.request.eject(requestInterceptor);
       httpClient.interceptors.response.eject(responceInterceptor);
     };
   }, [requestInterceptor,responceInterceptor]);

   return [error, errorConfirmedHandler]
}