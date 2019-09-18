<template>
    <div class="u3-question-partBAsk">
        <U3QuestionContainer
            :show-search-word-tip="propsData.showSearchWordTip"
            :show-order="propsData.showOrder"
            :ques-order="propsData.quesOrder"
            :ques-score="propsData.quesScore"
            :show-recorder="propsData.showRecorder"
            :rec-options="propsData.recOptions"
        >
            <template v-slot:quesCont>
                <div class="u3-qst-content-text">
                    <span class="u3-qst-num" />
                    <span
                        class="u3-qst-text-cont"
                        v-html="propsData.questionText"
                    />
                    <U3Recorder
                        :record-type="propsData.recordType"
                        :part-type="propsData.partType"
                        :show-score="showScore"
                        :src="propsData.src"
                    />
                    <H5Audio
                        v-show="propsData.testType === 0 && propsData.audioSrc"
                        type="rectangle"
                        class="block-audio"
                        :play-status="propsData.playStatus"
                        :src="propsData.audioSrc"
                    />
                </div>
            </template>
            <template v-slot:analysis>
                <U3AnswerAnalysis
                    v-show="analysisShow"
                    :answer="propsData.analysisOpt.answer.content"
                    :answer-inline="propsData.analysisOpt.answer.inline"
                    :analysis="propsData.analysisOpt.analysis.content"
                    :analysis-inline="propsData.analysisOpt.analysis.inline"
                >
                    <template v-slot:knowledge />
                    <template v-slot:answer>
                        {{ propsData.analysisOpt.answer.content }}
                        <H5Audio class="inline-audio" />
                    </template>
                    <template v-slot:analysis>
                        {{ propsData.analysisOpt.analysis.content }}
                    </template>
                </U3AnswerAnalysis>
            </template>
        </U3QuestionContainer>
    </div>
</template>
<style lang="scss" scoped>
.u3-question-partBAsk {
  padding-top: 0.24rem;
}
.u3-qst-content-text {
  text-align: center;
  margin: 0.9rem auto 0;
  font-size: 0.32rem;
  color: #333333;
}
.inline-audio {
  display: inline-block;
}
.block-audio {
  display: flex;
  justify-content: center;
}
</style>
<script>
import U3QuestionContainer from 'Pacakges/question-container/src/questionContainer.vue';
import U3AnswerAnalysis from 'Pacakges/answer-analysis/src/answerAnalysis.vue';
import { H5Audio } from 'Pacakges/audioPlayer/index';
import U3Recorder from 'Pacakges/recorder/index';

export default {
    name: 'U3QuestionPartBAsk',
    components: {
        U3QuestionContainer,
        U3AnswerAnalysis,
        H5Audio,
        U3Recorder,
    },
    props: {
        propsData: {
            type: String,
            default: undefined,
        },
    },
    data: () => ({
        elements: {

        },
        // 其他
        analysisShow: false,
        showScore: false,
        userAccuracy: '',
        userCompletion: '',
        userFluency: '',
        userStar: '',
        hasRecHistory: '',
        // 音频文件 三问
        playStatus: false,
    }),
    created() {
        this.elements[this.propsData.elementId] = {
            elementId: this.propsData.elementId,
            elementType: this.propsData.elementType,
            elementAttr: {
                question_id: this.propsData.questionId,
                question_type: this.propsData.questionType,
                order: this.propsData.questNum || 1,
                user_score: 0,
                user_answer: '',
                answer: this.propsData.analysisOpt.answer.content || '',
                score: this.propsData.quesScore - 0,
                result: -1,
                timestamp: 0,
                record_url: '',
                duration: 0,
                wrongnote_flag: this.propsData.wrongNoteFlag === 0 ? 0 : 1,
            },
        };
        const recordEle = this.propsData.recordSpeak[0];
        this.elements[recordEle.element_id] = {};
        this.elements[recordEle.element_id].elementId = recordEle.element_id;
        this.elements[recordEle.element_id].elementType = recordEle.element_type;
        this.elements[recordEle.element_id].elementAttr = {
            question_id: this.propsData.questionId,
            question_type: this.propsData.questionType,
            order: 1,
            answer: recordEle.content,
            user_answer: '',
            score: this.quesScore,
            user_score: 0,
            record_result: '',
            record_url: '',
            duration: 0,
            result: -1,
            timestamp: 0,
            wrongnote_flag: this.propsData.wrongNoteFlag === 0 ? 0 : 1,
            accuracy: 0,
            completion: 0,
            fluency: 0,
        };
    },
    mounted() {
        this.$on('endRecord', (result, score, recordUrl, duration) => {
            const userScore = Number((score - 0) * this.quesScore / 100).toFixed(2) - 0;
            if (this.uploadRecorder) {
                this.modifyElement(this.recordSpeak[0].element_id, {
                    record_result: result,
                    user_score: userScore,
                    timestamp: Date.now(),
                    record_url: recordUrl,
                    duration,
                    accuracy: typeof result === 'string' ? 0 : result.accuracy,
                    completion: typeof result === 'string' ? 0 : result.completion,
                    fluency: typeof result === 'string' ? 0 : result.fluency,
                });
                this.modifyElement(this.elementId, {
                    user_score: userScore,
                    timestamp: Date.now(),
                    record_url: recordUrl,
                    duration,
                });
            } else {
                this.modifyElement(this.recordSpeak[0].element_id, {
                    record_result: result,
                    user_score: userScore,
                    timestamp: Date.now(),
                    accuracy: typeof result === 'string' ? 0 : result.accuracy,
                    completion: typeof result === 'string' ? 0 : result.completion,
                    fluency: typeof result === 'string' ? 0 : result.fluency,
                });
                this.modifyElement(this.elementId, {
                    user_score: userScore,
                    timestamp: Date.now(),
                });
            }
            this.playStatus = true;
            this.$emit('endrecord', this.questNum, score);
            this.$emit('qststatechange', 1, this.questNum, 100);
        });
    },
    beforeDestroy() {
        this.$off();
    },
    methods: {
        judge() {
            const resultMap = {};
            function _resultMap(eleId, uans, usc, res) {
                resultMap[eleId] = {
                    user_answer: uans,
                    user_score: usc,
                    result: res,
                };
            }
            Object.entries(this.elements).forEach((value) => {
                if (value[1].elementAttr.timestamp) {
                    if (value[1].elementAttr.user_score === 0) {
                        this.elements[value[0]].elementAttr.result = 0;
                    } else if (value[1].elementAttr.user_score === 100) {
                        this.elements[value[0]].elementAttr.result = 1;
                    } else {
                        this.elements[value[0]].elementAttr.result = 3;
                    }
                } else {
                    this.elements[value[0]].elementAttr.result = 2;
                }
                _resultMap(value[0], this.elements[value[0]].elementAttr.user_answer, this.elements[value[0]].elementAttr.user_score, this.elements[value[0]].elementAttr.result);
            });

            return resultMap;
        },
        review() {
            this.analysisShow = true;
            this.showScore = true;
        },
        retry() {
            this.analysisShow = false;
            this.showScore = false;
        },
        validateAnswer() {
            const resultMap = Object.entries(this.judge());
            resultMap.forEach((value) => {
                if (value[0] !== this.elementId) {
                    const score = value[1].user_score;
                    const { result } = resultMap[1];
                    if (result === 2) {
                        this.showScore = true;
                        this.userScore = 0;
                    } else {
                        this.showScore = true;
                        this.userScore = (score * this.quesScore / 100).toFixed(2) - 0;
                    }
                    // 置灰
                }
            });
        },
        modifyElement(elementId, elementAttr) {
            if (typeof this.elements[elementId] !== 'undefined') {
                Object.assign(this.elements[elementId].elementAttr, elementAttr);
            }
        },
        getQstElementAttrs() {
            return this.elements;
        },
    },
};
</script>
