import React from 'react';
import {Button, Image} from "UI/index";

const Questions = () => {

    const productQuestions = [
        {
            qs: { username: "alex", avatar: "", text: "It supports jio sim", created_at: new Date().toString() },
            ans: { text: "Yes, It's" },
        },
        {
            qs: { username: "antron", avatar: "", text: "It 5G", created_at: new Date() },
            ans: { text: "Yes, It's" },
        },
        {
            qs: { username: "alex", avatar: "", text: "It supports jio sim", created_at: new Date().toString() },
            ans: { text: "Yes, It's" },
        },
        {
            qs: { username: "antron", avatar: "", text: "It 5G", created_at: new Date() },
            ans: { text: "Yes, It's" },
        },
        {
            qs: { username: "alex", avatar: "", text: "It supports jio sim", created_at: new Date().toString() },
            ans: { text: "Yes, It's" },
        },
        {
            qs: { username: "antron", avatar: "", text: "It 5G", created_at: new Date() },
            ans: { text: "Yes, It's" },
        },
        {
            qs: { username: "alex", avatar: "", text: "It supports jio sim", created_at: new Date().toString() },
            ans: { text: "Yes, It's" },
        },
        {
            qs: { username: "antron", avatar: "", text: "It 5G", created_at: new Date() },
            ans: { text: "Yes, It's" },
        },
    ];

    return (
        <div>
            <div className="question_answer_section">
                <div  className="section_title">
                    Questions and Answers
                </div>
                <div className="question_answer_root">
                    {productQuestions.map((qs) => (
                        <div className="question_answer p-3">
                            <div>
                                <h5>Q: {qs.qs.text}</h5>
                            </div>
                            <h5>A: {qs.ans.text}</h5>

                            <div className="mt-2">
                                <div className="flex">
                                    <Image src={""} />
                                    <div className="ml-2" >
                                        {qs.qs.username}
                                    </div>
                                </div>
                                <div >{new Date(qs.qs.created_at).toDateString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <Button className="text-primary" style={{ marginLeft: 0 }} type="text">
                    All Questions
                </Button>
            </div>
        </div>
    );
};

export default Questions;