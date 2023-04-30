import { Section } from './section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
    const [good, updGood] = useState(0);
    const [neutral, updNeutral] = useState(0);
    const [bad, updBad] = useState(0);

    const countTotalFeedback = () => {
        return good + neutral + bad;
    };

    const onLeaveFeedback = option => {
        if (option === 'good') updGood(obj => (obj += 1));
        if (option === 'neutral') updNeutral(obj => (obj += 1));
        if (option === 'bad') updBad(obj => (obj += 1));
    };

    const countPositivePercentage = () => {
        return Math.round((good / countTotalFeedback()) * 100) || 0;
    };

    return (
        <>
            <Section title="Please leave feedback">
                <FeedbackOptions
                    options={{ good, neutral, bad }}
                    onLeaveFeedback={onLeaveFeedback}
                />
            </Section>
            <Section title="Statistics">
                {countTotalFeedback() ? (
                    <Statistics
                        options={{
                            good,
                            neutral,
                            bad,
                            total: countTotalFeedback(),
                            'Positive feedback': countPositivePercentage(),
                        }}
                    />
                ) : (
                    <Notification message="There is no feedback" />
                )}
            </Section>
        </>
    );
};
