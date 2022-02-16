import React, { useState, useEffect, useRef } from 'react';
import './calculator.css';

import { BTN_ACTIONS, btns } from '../btnConfig'

const Calculator = () => {

    const expRef = useRef(null);
    const btnsRef = useRef(null);

    const [expression, setExpression] = useState('');

    useEffect(() => {
        const btns = Array.from(btnsRef.current.querySelectorAll('button'));
        // console.log(btns) //Lấy từng ele có thẻ là button => 20 button
        btns.forEach(e => e.style.height = e.offsetWidth + 'px');
        //Set chiều cao của mỗi nút bằng với chiều ngang của nó
    },[])

    const btnClick = (item) => {
        const expDiv = expRef.current;

        const toggleBtn = document.getElementsByClassName('toggle__theme');
        if (item.action === BTN_ACTIONS.THEME) {
            document.body.classList.toggle('dark');
            toggleBtn[0].classList.toggle('active')
        }

        if (item.action === BTN_ACTIONS.ADD) {
            addAnimSpan(item.display);

            const oper = item.display === 'x' ? '*' : item.display === '%' ? '/100' : item.display;
            setExpression(expression + oper);
        }

        if (item.action === BTN_ACTIONS.DELETE) {
            expDiv.parentNode.querySelector('div:last-child').innerHTML = '';
            expDiv.innerHTML = '';
            setExpression(' ');
        }

        if (item.action === BTN_ACTIONS.CALC) {
            // console.log(expression)
            if (expression.trim().length <= 0) return;
            
            expDiv.parentNode.querySelector('div:last-child').remove();

            const cloneNode = expDiv.cloneNode(true);
            expDiv.parentNode.appendChild(cloneNode);

            const transform = `translateY(${-(expDiv.offsetHeight + 10) + 'px'}) scale(0.4)`;

            try {
                let res = eval(expression);

                setExpression(res.toString());
                setTimeout(() => {
                    cloneNode.style.transform = transform;
                    expDiv.innerHTML = '';
                    addAnimSpan(Math.floor(res * 100000000) / 100000000);
                },200)
            } catch {
                setTimeout(() => {
                    cloneNode.style.transform = transform;
                    cloneNode.innerHTML = 'Syntax err';
                },200)
            } finally {
                console.log('calc complete')
            }
        }
    }

    //Xử lý animation khi add thẻ span (tức hiệu ứng xuất hiện khi ấn các button để thêm vào màn hình)
    const addAnimSpan = (content) => {
        const expDiv = expRef.current; //Lấy thẻ có rè là expRef
        const span = document.createElement('span'); //Tạo ra 1 thẻ span

        span.innerHTML = content;
        span.style.opacity = '0';
        expDiv.appendChild(span); //Thêm thẻ span vào cuối ds nút con của expDiv

        const width = span.offsetWidth + 'px'; //Thẻ span đã nằm trên thẻ div đầu tiên trong result
        span.style.width = '0'

        setTimeout(() => {
            span.style.opacity = '1';
            span.style.width = width;
        },100)
    }

    return (
        <div className='calculator'>
            <p className='scroll-bar'></p>
            <div className='calculator__result'>
                <div ref={expRef} className='calculator__result__exp'></div>
                <div className='calculator__result__exp'></div>
            </div>
            <div ref={btnsRef} className='calculator__btns'>
                {
                    btns.map((item,index) => (
                        <button
                            key={index}
                            className={item.class}
                            onClick={() => btnClick(item)}
                        >   
                            {item.display}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Calculator