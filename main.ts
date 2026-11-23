// stackvm-mini: make.fun tiny stack ISA v1 VM
import{readdirSync as L,readFileSync as F,writeFileSync as W,mkdirSync as K}from'fs'
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output',Q=[],S='0000001101024010301004012050220602307033100211102112021130211402115021160211701118021190211a0211b0111c0211d0211e021200212102122021302003121032210332003400040011410205001051010520015301'
for(let i=0;i<S.length;i+=5)Q[parseInt(S.slice(i,i+2),16)]=[+S[i+2],+S[i+3],+S[i+4]]
for(let d of L(I).sort()){let p=F(I+'/'+d+'/program.bin'),n=p.length,u=[],s=new Int32Array(257),m=new Int32Array(256),c=[],o=Buffer.alloc(65536),z=0,t=0,x=0,k=0,l=0,r
try{u=F(I+'/'+d+'/input.bin')}catch{}
for(;;){if(t>=1e6){r=10;break}if(x<0||x>=n){r=9;break}let v=p[x],g=Q[v];if(!g){r=5;break}let[i,P,U]=g;if(x+i>=n){r=9;break}t++
if(z<P){r=2;break}if(z-P+U>256){r=3;break}let y=x+1+i,b=s[z-1],a=s[z-2],h=p[x+1]|p[x+2]<<8,e
if(v>18&&v<23&&!b){r=4;break}if(P==2&&U==1){z--;switch(v){case 16:e=a+b;break;case 17:e=a-b;break;case 18:e=Math.imul(a,b);break;case 19:e=a/b;break;case 20:e=a%b;break;case 21:e=(a>>>0)/(b>>>0);break;case 22:e=(a>>>0)%(b>>>0);break;case 24:e=a&b;break;case 25:e=a|b;break;case 26:e=a^b;break;case 28:e=a<<b;break;case 29:e=a>>b;break;case 30:e=a>>>b;break;case 32:e=a==b;break;case 33:e=a<b;break;default:e=a>>>0<b>>>0}s[z-1]=e}else switch(v){case 0:r=0;break
case 1:s[z++]=h<<24>>24;break
case 2:s[z++]=h|p[x+3]<<16|p[x+4]<<24;break
case 3:z--;break
case 4:s[z++]=b;break
case 5:s[z-1]=a;s[z-2]=b;break
case 6:s[z++]=a;break
case 7:s[z-1]=s[z-3];s[z-3]=a;s[z-2]=b;break
case 23:s[z-1]=-b;break
case 27:s[z-1]=~b;break
case 48:y+=h<<16>>16;break
case 49:case 50:z--;if(!b==(v==49))y+=h<<16>>16;break
case 51:if(c.length>63){r=7;break}c.push(y);y=h;break
case 52:if(!c.length){r=8;break}y=c.pop();break
case 64:if(b>>>0>255){r=6;break}s[z-1]=m[b];break
case 65:if(b>>>0>255){r=6;break}m[b]=a;z-=2;break
case 80:case 81:e=v>80?[b&255]:Buffer.from(''+b);if(l+e.length>65536){r=11;break}o.set(e,l);l+=e.length;z--;break
case 82:s[z++]=k<u.length?u[k++]:-1;break
case 83:r=b&255}if(r!=null)break;x=y}
K(O+'/'+d,{recursive:true});W(O+'/'+d+'/stdout.bin',o.subarray(0,l));W(O+'/'+d+'/exit.txt',r+'\n')}
