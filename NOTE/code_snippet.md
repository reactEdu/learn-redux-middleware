# code snippet 직접 제작
- 리액트의 컴포넌트 그리고 리덕스에서 반복되는 소스 매번 작성하기 손 아프다.
- Extenstions에서 snippet 다운받아 써봤는데 단축키 다 외우기 힘들뿐더러 내가 원하는 스타일이 조금씩 다르거나 존재하지 않는다.
- 고로 만들어서 쓰자!!

## 컴포넌트 단축키 만들기
- 컴포넌트 생성하고 컴포넌트 이름을 ${TM_FILENAME_BASE}로 변경

```javascript
import React from 'react';

const ${TM_FILENAME_BASE} = () => {
  return (
    <>

    </>
  );
};

export default ${TM_FILENAME_BASE};
```

- https://snippet-generator.app/ 로 접속해서 컴포넌트 소스 복붙후 설명과 단축키 부분 작성하고 Copy snippet 클릭

- VSCODE의 언어설정을 react javascript로 변경

- Preference -> user snipets
  - javascriptreact.json에 아래 내용 복붙
  - ${1:} 은 코드 생성시 처음으로 포커스가 가는 부분
  - ${2:} 는 탭 누르면 그다음으로 포커스가 가는 부분

```javascript
{
  "Creat React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "const ${1:${TM_FILENAME_BASE}} = () => {",
      "  return (",
      "    <>",
      "      ${2:}",
      "    </>",
      "  );",
      "};",
      "",
      "export default ${1:${TM_FILENAME_BASE}};"
    ],
    "description": "Creat React Functional Component"
  }
}
```

## 만들 스니펫

### 리액트 전용
- rfc : 리액트 펑션 컴포넌트
- rcc : 리액트 클래스 컴포넌트 

### 리덕스 전용
- rdm : 리덕스 모듈
- rdp : 리덕스 프로바이더

### 넥스트 전용
- nxrdp : 넥스트용 리덕스 프로바이더

```javascript
{
  "Creat React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "const ${1:${TM_FILENAME_BASE}} = () => {",
      "  return (",
      "    <>",
      "      ${2:}",
      "    </>",
      "  );",
      "};",
      "",
      "export default ${1:${TM_FILENAME_BASE}};"
    ],
    "description": "Creat React Functional Component"
  },
  "Creat React Class Component": {
    "prefix": "rcc",
    "body": [
      "import React, { Component } from 'react';",
      "",
      "class ${1:${TM_FILENAME_BASE}} extends Component {",
      "  render() {",
      "    return (",
      "      <>",
      "        ${2:}",
      "      </>",
      "    );",
      "  }",
      "}",
      "",
      "export default ${1:${TM_FILENAME_BASE}};"
    ],
    "description": "Creat React Class Component"
  }
}
```