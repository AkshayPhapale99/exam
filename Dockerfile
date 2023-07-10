FROM 172.18.0.52:5000/node  

WORKDIR /src

COPY . .
 
EXPOSE 4000

CMD node index.js