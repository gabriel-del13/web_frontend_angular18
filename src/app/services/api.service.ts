import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    return headers;
  }
  

  get(endpoint: string, params?: {[param: string]: any}): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (Array.isArray(value)){
          value.forEach(val=> {
            httpParams = httpParams.append(key, val.toString());
          })
        } else if (value !== null && value !== undefined){
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get(`${this.apiUrl}/${endpoint}`, { 
      headers: this.getHeaders(),
      params: httpParams
    })
    .pipe(catchError(this.handleError));
  }
  /*


Este servicio utiliza `HttpClient` de Angular para realizar peticiones HTTP a una API, permitiendo que se le pasen filtros opcionales en las peticiones.

#### 1. **Encabezados (Headers)**
   - **`getHeaders()`**: Esta función devuelve un objeto `HttpHeaders`, que es esencialmente un conjunto de encabezados HTTP para nuestras peticiones. 
   En este caso, estamos especificando que el contenido que enviamos es en formato JSON. Esto es importante cuando interactuamos con APIs que requieren encabezados específicos para procesar las peticiones.
   
#### 2. **Método GET que acepta filtros**
   - **`get()`**: Este método realiza una petición `GET` al servidor. Acepta dos parámetros: el `endpoint` que indica la ruta específica de la API, y un objeto opcional `params` que contiene los filtros.
     - **`params` (opcional)**: Este es un objeto que representa los filtros que se aplicarán a la solicitud, como el nombre de una categoría o una fecha de actualización. 
     Este objeto se convierte en parámetros de la URL (query parameters), que son utilizados por el backend para devolver solo los resultados que coinciden con esos filtros.
     - **Conversión de parámetros**:
       - Si el filtro es un valor único (por ejemplo, una cadena o número), se agrega a la URL usando `set`.
       - Si el filtro es un array (una lista de valores), se usa `append` para agregar cada valor por separado, lo que permite enviar múltiples valores para un solo filtro.
       - **Ejemplo**: Si `parent_category_id` es un array, se enviarían múltiples valores de este parámetro a la API, como `?parent_category_id=1&parent_category_id=2`.
       
   - **`HttpParams`**: Es una clase de Angular que nos permite construir parámetros de consulta de manera fácil. Este método construye dinámicamente los parámetros según los filtros que le pasemos.
   
#### 3. **Manejo de errores**
   - **`handleError()`**: En caso de que la solicitud falle (por ejemplo, si el servidor no está disponible o la API responde con un error), esta función se encarga de capturar el error y devolver un mensaje de error amigable.
   - **`pipe(catchError())`**: Aquí es donde aplicamos el manejo de errores. `pipe` nos permite encadenar operadores RxJS y `catchError` captura cualquier error que ocurra durante la solicitud HTTP.

#### 4. **Uso de `Observable`**
   - Este método devuelve un `Observable`, que es una forma de manejar operaciones asíncronas en Angular. Los `Observables` permiten suscribirse a los cambios de datos a lo largo del tiempo y son muy usados en Angular para manejar peticiones HTTP.

### Flujo general:
1. Definimos los encabezados que usaremos en cada petición.
2. Construimos los parámetros de consulta dinámicamente según los filtros que el usuario quiera aplicar.
3. Realizamos la petición HTTP y, si ocurre un error, lo capturamos para que el usuario reciba un mensaje adecuado.
4. Devolvemos un `Observable` que puede ser usado en cualquier componente para manejar los datos de respuesta o el error.
  */

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error HTTP:', error);
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      console.error('Error:', error.error.message);
    } else {
      // El backend retornó un código de respuesta sin éxito.
      console.error(
        `Backend retornó código ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Retorna un observable con un mensaje de error orientado al usuario
    return throwError(() => error);
  }
}