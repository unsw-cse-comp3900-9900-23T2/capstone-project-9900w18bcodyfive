import styled from "@emotion/styled";

const Circle1 = styled('div')({
    backgroundColor: 'green',
    height: '800px',
    width:'800px',
    position: 'fixed',
    right: '-100px',
    top: '-150px',
    borderRadius: '0 0 50% 70%',
    zIndex: '-1',

});

const Circle2 = styled('div')({
    backgroundColor: 'green',
    height: '500px',
    width:'500px',
    position: 'fixed',
    right: '530px',
    top: '-170px',
    borderRadius: '0 0 50% 80%',
    zIndex: '-1'
});



const CirclePattern = ()=>{
    return(
        <>
            <Circle1 />
            <Circle2 />
        </>
    );
}

export default CirclePattern;