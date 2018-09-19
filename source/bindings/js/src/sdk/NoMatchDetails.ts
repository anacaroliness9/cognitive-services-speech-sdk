//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

import {
    ISimpleSpeechPhrase,
    RecognitionStatus2,
} from "../../src/common.speech/Exports";
import {
    IntentRecognitionResult,
    NoMatchReason,
    SpeechRecognitionResult,
    TranslationTextResult,
} from "./Exports";

/**
 * Contains detailed information for NoMatch recognition results.
 */
export class NoMatchDetails {
    private reason: NoMatchReason;

    private constructor(reason: NoMatchReason) {
        this.reason = reason;
    }

    /**
     * Creates an instance of NoMatchDetails object for the NoMatch SpeechRecognitionResults.
     * @param The recognition result that was not recognized.
     * @return The no match details object being created.
     */
    public static fromResult(result: SpeechRecognitionResult | IntentRecognitionResult | TranslationTextResult): NoMatchDetails {
        const simpleSpeech: ISimpleSpeechPhrase = JSON.parse(result.json);

        let reason: NoMatchReason = NoMatchReason.NotRecognized;

        const realReason = (RecognitionStatus2 as any)[simpleSpeech.RecognitionStatus];

        switch (realReason) {
            case RecognitionStatus2.BabbleTimeout:
                reason = NoMatchReason.InitialBabbleTimeout;
                break;
            case RecognitionStatus2.InitialSilenceTimeout:
                reason = NoMatchReason.InitialSilenceTimeout;
                break;
            default:
                reason = NoMatchReason.NotRecognized;
                break;
        }

        return new NoMatchDetails(reason);
    }

    /**
     * The reason the recognition was canceled.
     * @return Specifies the reason canceled.
     */
    public get Reason(): NoMatchReason {
        return this.reason;
    }
}
