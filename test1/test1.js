// Реализация класса с методами 

const object = {
    start_step: "8e9893a6-6930-476e-80d6-cf68a731044a",
    steps: [{
        id: "8e9893a6-6930-476e-80d6-cf68a731044a",
        title: "Outbound call",
        kind: "outbound_call",
        options: null,
        ref: "a266540c-5052-4bb5-8ee6-eb455bd1111"
    },
    {
        id: "a266540c-5052-4bb5-8ee6-eb455bd1111",
        title: "Play audio",
        kind: "play_audio",
        options: {
            audio: {
                url: "https://company.org/play/audio.mp3"
            }
        },
        ref: "810893a6-6930-476e-80d6-cf68a731044a"
    },
    {
        id: "810893a6-6930-476e-80d6-cf68a731044a",
        title: "Collect input",
        kind: "collect_input",
        options: null,
        ref: "810893a6-6930-476e-70d6-cf68a731044a"
    },
    {
        id: "810893a6-6930-476e-70d6-cf68a731044a",
        title: "Scenario End",
        kind: "scenario_end",
        options: null,
        ref: null
    }]
}

class MyClass {
    constructor(object) {
        let { start_step, steps } = object;
        this.start_step = start_step;
        this.steps = steps;
        this.refs = [];
        this.prevs = [];
        this.listOfIdSteps = [];
        this.isAudio = [];
    }

    getStepById(id) {
        let res = this.steps.filter(item => item.id == id)
        if (res.length > 0) {
            return res;
        } else return null;
    }

    getNextStep(id) {
        let res = this.steps.filter(item => item.id == id)
        if (res.length > 0) {
            for (let i = 0; i < res.length; i++) {
                if (res[i].ref != null) {
                    this.refs.push(res[i].ref);
                }
                else {
                    return null;
                }
            }
            return this.refs.join('\n');
        } else return null;
    }

    getPrevStep(id) {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].id == id) {
                this.prevs.push(this.steps[i - 1]);
            }
        }

        if (this.prevs.length > 0) {
            for (let j = 0; j < this.prevs.length; j++) {
                if (typeof (this.prevs[j]) == 'undefined') {
                    return null;
                } else return this.prevs;
            }
        } else {
            return null;
        }
    }

    getListOfIdSteps() {
        if (this.steps.length > 0) {
            for (let i = 0; i < this.steps.length; i++) {
                this.listOfIdSteps.push(this.steps[i].id)
            }
        }
        else {
            return null;
        }
        return this.listOfIdSteps;
    }

    getIsAudio(id) {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].id == id) {
                this.isAudio.push(this.steps[i].options?.audio?.url ? true : false)
            }
        }
        if (this.isAudio.length > 0) {
            return this.isAudio.join();
        } else {
            return  null;
        }
    }
}

let obj = new MyClass(object);
console.log(obj.getStepById('8e9893a6-6930-476e-80d6-cf68a731044a'));
console.log(obj.getNextStep('810893a6-6930-476e-70d6-cf68a731044a'));
console.log(obj.getPrevStep('810893a6-6930-476e-8d6-cf68a731044'));
console.log(obj.getListOfIdSteps());
console.log(obj.getIsAudio('810893a6-6930-476e-70d6-cf68a731044a'))

