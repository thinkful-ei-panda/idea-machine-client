import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Result from '../../components/IdeaResults/Result';
describe(`Result Component`, () => {
    describe(`Smoke test`, () => {
        it(`Renders without crashing`, () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <BrowserRouter>
                    <Result result={{title:'asdf',content:'aldksjf',user_name:'ladkjs',id:1,public_status:true,followed:'aldsfj'}}/>
                </BrowserRouter>
                , div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });
    
    describe(`Snapshot test`, () => {
        it(`Renders the UI as expected`, () => {
            const tree = renderer
                .create(
                    <BrowserRouter>
                        <Result result={{title:'asdf',content:'aldksjf',user_name:'ladkjs',id:1,public_status:true,followed:'aldsfj'}}/>
                    </BrowserRouter>
                )
                .toJSON()
            expect(tree).toMatchSnapshot()
        });
    });
})