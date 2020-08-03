import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import IdeaResults from '../../components/IdeaResults/IdeaResults';
describe(`IdeaResults Component`, () => {
    describe(`Smoke test`, () => {
        it(`Renders without crashing`, () => {
            const div = document.createElement('div');
            const result = {title:'asdf',content:'aldksjf',user_name:'ladkjs',id:1,public_status:true,followed:'aldsfj'}
            ReactDOM.render(
                <BrowserRouter>
                    <IdeaResults results={[result]}/>
                </BrowserRouter>
                , div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });
    
    describe(`Snapshot test`, () => {
        it(`Renders the UI as expected`, () => {
            const result = {title:'asdf',content:'aldksjf',user_name:'ladkjs',id:1,public_status:true,followed:'aldsfj'}
            const tree = renderer
                .create(
                    <BrowserRouter>
                        <IdeaResults results={[result]}/>
                    </BrowserRouter>
                )
                .toJSON()
            expect(tree).toMatchSnapshot()
        });
    });
})