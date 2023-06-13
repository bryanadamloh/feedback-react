import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FeedbackForm = ({ showModal, email}) => {
    const moods = [
        { emoji: '🤬', label: 'Terrible...' },
        { emoji: '🙁', label: 'Okay.' },
        { emoji: '😁', label: 'Awesome!' },
    ];

    const reasons = [
        [
            "I felt very bored.",
            "I don't understand all parts.",
            "I can't do all of the activities.",
            "I don't like to interact with my tutors.",
            "I don't like to interact with my classmates.",
        ],
        [
            "I felt bored a few times.",
            "I can only understood some parts.",
            "I can only do some of the activities.",
            "I wish to interact more with my tutor.",
            "I wish to interact more with my classmates.",
        ],
        [
            "I did not feel bored at all.",
            "I understood almost everything.",
            "I can do all the activities.",
            "I enjoy interacting with my tutors.",
            "I enjoy interacting with my classmates.",
        ],
    ];

    const [mood, setMood] = useState(null);

    const handleIndexChange = (event, index) => {
        setMood(event.target.value);
    };

    const handleSubmitFeedback = (event, index) => {
        const data = {
            email: email,
            mood: parseInt(mood),
            feedback: event.target.value
        }

        fetch("http://localhost:3001/feedbacks", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(data),
        }).then(async (response) => {
            toast.success('Thank you for your feedback!', {
                position: toast.POSITION.TOP_RIGHT
            });

            setMood(null);
            showModal(false);
        }).catch((error) => {
            toast.error('There\'s an error!', {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    };

    return (
        <div tabIndex="-1" className="fixed z-50 p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
            {/* TODO: Could have make it as a modal and toggle through a button */ }
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-gray-700 rounded-lg shadow">
                    <div className="p-6 text-center">
                        <h3 className="text-lg font-normal text-white">How was your class today?</h3>
                        <p className="mb-3 text-white font-normal text-sm">
                            Your honest answer will help to improve the class in the future
                        </p>
                        {/* TODO: Make it as a smaller component for each emoji instead */ }
                        <div className="mt-6 flex flex-wrap justify-center items-center">
                            {
                                moods.map((item, index) => (
                                    <div key={index} className="w-[90px] h-[90px] flex justify-center items-center">
                                        <label>
                                            <input className="hidden" type="radio" name="mood" value={index} onChange={(event) => handleIndexChange(event, index)} />
                                            <span className="text-5xl cursor-pointer grayscale-[70%] hover:grayscale-0 hover:text-6xl">{item.emoji}</span>
                                            <p className="mt-2 text-sm text-white">{item.label}</p>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* TODO: Make it as a smaller component for each list group */ }
                    { mood ? <div className="pb-6 px-4 text-center">
                        <h3 className="text-lg font-normal text-white">Can you tell us why?</h3>
                        <div className="my-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {
                                reasons[mood].map((item, index) => (
                                    <div key={index}>
                                        <label className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                            <input className="hidden" type="radio" name="feedback" value={item} onChange={(event) => handleSubmitFeedback(event, index)} />
                                            {item}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div> : null }

                </div>
            </div>
        </div>
    )
};

export default FeedbackForm;