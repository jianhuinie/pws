/**
 * 老师轮播
 * @author xiazhiyao
 */
import {PureComponent} from 'react';
import TeacherItem from '~/component/TeacherItem/index';
import './index.styl';

class TeacherCarousel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            assistantTeachers: props.assistantTeachers,
            masterTeachers: props.masterTeachers,
            showNumber: props.showNumber,
            teacherTotalArr: [],
            currentIndex: 0
        };
    }

    componentDidMount() {
        this.teacherTotalArr();
    }

    // teacherTotalArr
    teacherTotalArr = () => {
        const {masterTeachers, assistantTeachers} = this.state;
        masterTeachers.forEach(masterTeacher => {
            masterTeacher.text = '主讲老师';
        });
        // let assistantTeacherResult = [];
        // 辅导老师后台给的数据有数组和对象
        if (Array.isArray(assistantTeachers)) {
            assistantTeachers.forEach(assistantTeacher => {
                assistantTeacher.text = '辅导老师';
                assistantTeacher.displayName = assistantTeacher.displayName || '待定';
            });
        }
        else {
            assistantTeachers.text = '辅导老师';
            assistantTeachers.displayName = assistantTeachers.displayName || '待定';
        }
        const teacherArr = masterTeachers.concat(assistantTeachers);
        const twoDimensionalteacherArr = this.teacherArrChange(teacherArr);
        this.setState({teacherTotalArr: twoDimensionalteacherArr});
    }

    // 将teacherArr一维数组转化为二维数组
    teacherArrChange = teacherArr => {
        const {showNumber} = this.state;
        const twoDimensionalArr = [];
        for (let i = 0, len = teacherArr.length; i < len; i += showNumber) {
            let middleArr = [];
            middleArr = teacherArr.slice(i, i + showNumber);
            twoDimensionalArr.push(middleArr);
        }
        return twoDimensionalArr;
    }

    addArrowClass = index => {
        let className = '';
        const {teacherTotalArr, currentIndex} = this.state;
        const teacherTotalArrLength = teacherTotalArr.length;
        if (teacherTotalArrLength === 0 || teacherTotalArrLength === 1) {
            className = 'all-hide';
        }
        else if (currentIndex === index) {
            className = 'hide';
        }
        return className;
    }

    minusIndex = currentIndex => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = 0;
        }
        this.setState({currentIndex});
    }

    addIndex = currentIndex => {
        const teacherTotalArrLength = this.state.teacherTotalArr.length;
        if (currentIndex < teacherTotalArrLength - 1) {
            currentIndex++;
        } else {
            currentIndex = teacherTotalArrLength - 1;
        }
        this.setState({currentIndex});
    }

    render() {
        const {teacherTotalArr, currentIndex} = this.state;
        const teacherTotalArrLength = teacherTotalArr.length;
        let keyIndex = 1;
        return (
            <div className="teacher-item">
                <div
                    className={'left-arrow ' + this.addArrowClass(0)}
                    role="presentation"
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => this.minusIndex(currentIndex)}
                >
                    <span className="skip-icon icon-shangyige" />
                </div>
                {
                    teacherTotalArr.length !== 0
                        && teacherTotalArr[currentIndex].map(teacher => (
                            <TeacherItem key={keyIndex++} teacher={teacher} />
                        ))
                }
                <div
                    className={'right-arrow ' + this.addArrowClass(teacherTotalArrLength - 1)}
                    role="presentation"
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => this.addIndex(currentIndex)}
                >
                    <span className="skip-icon icon-xaiyige" />
                </div>
            </div>
        );
    }
}


export default TeacherCarousel;
