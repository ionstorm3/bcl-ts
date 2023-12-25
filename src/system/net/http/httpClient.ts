import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {debug} from "../../diagnostics/debug";
import {HttpResult} from "./httpResult";


export class HttpClient {
    public async sendAsync<TResponse, TPayload>(config: AxiosRequestConfig<TPayload>): Promise<HttpResult<TResponse>> {
        try {
            const resp: AxiosResponse = await axios(config);
            return new HttpResult(resp.status, resp.statusText, resp.data);
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                debug.writeLine(error.response.data);
                debug.writeLine(error.response.status);
                debug.writeLine(error.response.headers);
                return new HttpResult(error.response.status, error.response.statusText);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                //Debug.writeLine(error.request);
                return new HttpResult(408, "Request timed out");
            } else {
                // Something happened in setting up the request that triggered an Error
                //Debug.writeLine('Error', error.message);
                return new HttpResult(0, error.message);
            }
        }
    }
}