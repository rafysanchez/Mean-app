npm install --save-dev jest-html-reporter

# Instalar dependências de produção
npm install express mongoose bcrypt jsonwebtoken

# Instalar dependências de desenvolvimento
npm install --save-dev typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/jest jest ts-jest ts-node-dev

# Instalar o jest-html-reporter separadamente
npm install --save-dev jest-html-reporter

npm install express mongoose bcrypt jsonwebtoken  
npm install --save-dev typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/jest jest ts-jest ts-node-dev jest-html-reporter


## evitar problemas de config no backend...
npm config set strict-ssl false
npm config set registry http://registry.npmjs.org/