import React, {FC} from 'react';
import Card from "UI/Form/Card/Card";

interface Props{
    httpResponse: {
        message: string,
        isSuccess: boolean,
        loading: boolean
    }
}

const HttpResponse: FC<Props> = (props) => {
    const {httpResponse} = props
    return (
        <div>
            {httpResponse.message && <Card
	            className={`font-semibold ${httpResponse.isSuccess ? "bg-green-500/20 text-green-700 " : "bg-red-500/10 text-red-500"}`}>
                    <p>{httpResponse.message }</p>
                </Card> }
  </div>
    );
};

export default HttpResponse;