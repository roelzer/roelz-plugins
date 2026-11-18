(()=>{var lx=Object.defineProperty;var cx=(s,t,e)=>t in s?lx(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var zt=(s,t,e)=>cx(s,typeof t!="symbol"?t+"":t,e);var pm=0,xd=1,mm=2;var Nr=1,gm=2,Go=3,ir=0,Mn=1,pi=2,Ur=0,Ho=1,Ka=2,vd=3,yd=4,_m=5;var Or=100,xm=101,vm=102,ym=103,Sm=104,Mm=200,bm=201,wm=202,Tm=203,Sd=204,Md=205,Em=206,Am=207,Rm=208,Cm=209,Pm=210,Im=211,Lm=212,Dm=213,Nm=214,Mc=0,bc=1,wc=2,Ro=3,Tc=4,Ec=5,Ac=6,Rc=7,bd=0,Um=1,Om=2,rs=0,wd=1,Td=2,Ed=3,Qa=4,Ad=5,Rd=6,Cd=7;var Pd=300,Fr=301,Vo=302,jc=303,th=304,Co=1e3,ns=1001,Cc=1002,gn=1003,Fm=1004;var ja=1005;var Hn=1006,eh=1007;var Yi=1008;var jn=1009,Id=1010,Ld=1011,Wo=1012,nh=1013,Zi=1014,Di=1015,$i=1016,ih=1017,sh=1018,Br=1020,Dd=35902,Nd=35899,Ud=1021,Od=1022,Ji=1023,Es=1026,Rs=1027,rh=1028,oh=1029,sr=1030,ah=1031;var lh=1033,tl=33776,el=33777,nl=33778,il=33779,ch=35840,hh=35841,uh=35842,dh=35843,fh=36196,ph=37492,mh=37496,gh=37488,_h=37489,sl=37490,xh=37491,vh=37808,yh=37809,Sh=37810,Mh=37811,bh=37812,wh=37813,Th=37814,Eh=37815,Ah=37816,Rh=37817,Ch=37818,Ph=37819,Ih=37820,Lh=37821,Dh=36492,Nh=36494,Uh=36495,Oh=36283,Fh=36284,rl=36285,Bh=36286;var Ca=2300,Pc=2301,yc=2302,hd=2303,ud=2400,dd=2401,fd=2402;var Bm=3200;var zh=0,zm=1,Cs="",Sn="srgb",Pa="srgb-linear",Ia="linear",ye="srgb";var Sc=7680;var km=519,Gm=512,Hm=513,Vm=514,Fd=515,Wm=516,Xm=517,Bd=518,zd=519,qm=35044;var kd="300 es",Ai=2e3,Po=2001;function hx(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ux(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function La(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Ym(){let s=La("canvas");return s.style.display="block",s}var kp={},Io=null;function Gd(...s){let t="THREE."+s.shift();Io?Io("log",t,...s):console.log(t,...s)}function Zm(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Gt(...s){s=Zm(s);let t="THREE."+s.shift();if(Io)Io("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Vt(...s){s=Zm(s);let t="THREE."+s.shift();if(Io)Io("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Lr(...s){let t=s.join(" ");t in kp||(kp[t]=!0,Gt(...s))}function $m(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Jm={[Mc]:Mc,[wc]:Ac,[Tc]:Tc,[Ro]:Ec,[bc]:bc,[Ac]:wc,[Rc]:Rc,[Ec]:Ro},is=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gp=1234567,Aa=Math.PI/180,Lo=180/Math.PI;function Xo(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Cn[s&255]+Cn[s>>8&255]+Cn[s>>16&255]+Cn[s>>24&255]+"-"+Cn[t&255]+Cn[t>>8&255]+"-"+Cn[t>>16&15|64]+Cn[t>>24&255]+"-"+Cn[e&63|128]+Cn[e>>8&255]+"-"+Cn[e>>16&255]+Cn[e>>24&255]+Cn[n&255]+Cn[n>>8&255]+Cn[n>>16&255]+Cn[n>>24&255]).toLowerCase()}function Qt(s,t,e){return Math.max(t,Math.min(e,s))}function Hd(s,t){return(s%t+t)%t}function dx(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function fx(s,t,e){return s!==t?(e-s)/(t-s):0}function Ra(s,t,e){return(1-e)*s+e*t}function px(s,t,e,n){return Ra(s,t,1-Math.exp(-e*n))}function mx(s,t=1){return t-Math.abs(Hd(s,t*2)-t)}function gx(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function _x(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function xx(s,t){return s+Math.floor(Math.random()*(t-s+1))}function vx(s,t){return s+Math.random()*(t-s)}function yx(s){return s*(.5-Math.random())}function Sx(s){s!==void 0&&(Gp=s);let t=Gp+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Mx(s){return s*Aa}function bx(s){return s*Lo}function wx(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Tx(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Vd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ex(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),f=r((t-n)/2),u=o((t-n)/2),d=r((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*f,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*f,a*c);break;case"ZXZ":s.set(l*f,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*d,a*c);break;case"YXY":s.set(l*d,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*d,a*h,a*c);break;default:Gt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Wd(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Km(s,t){if(t.constructor===Float32Array)return s;let e=Wd(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function Qm(s,t){if(t.constructor===Float32Array)return s;let e=Wd(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var os={DEG2RAD:Aa,RAD2DEG:Lo,generateUUID:Xo,clamp:Qt,euclideanModulo:Hd,mapLinear:dx,inverseLerp:fx,lerp:Ra,damp:px,pingpong:mx,smoothstep:gx,smootherstep:_x,randInt:xx,randFloat:vx,randFloatSpread:yx,seededRandom:Sx,degToRad:Mx,radToDeg:bx,isPowerOfTwo:wx,ceilPowerOfTwo:Tx,floorPowerOfTwo:Vd,setQuaternionFromProperEuler:Ex,normalize:Qm,denormalize:Km},Jd=class Jd{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Jd.prototype.isVector2=!0;var ne=Jd,ui=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3],u=r[o+0],d=r[o+1],p=r[o+2],_=r[o+3];if(f!==_||l!==u||c!==d||h!==p){let m=l*u+c*d+h*p+f*_;m<0&&(u=-u,d=-d,p=-p,_=-_,m=-m);let g=1-a;if(m<.9995){let v=Math.acos(m),E=Math.sin(v);g=Math.sin(g*v)/E,a=Math.sin(a*v)/E,l=l*g+u*a,c=c*g+d*a,h=h*g+p*a,f=f*g+_*a}else{l=l*g+u*a,c=c*g+d*a,h=h*g+p*a,f=f*g+_*a;let v=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=v,c*=v,h*=v,f*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[o],u=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+h*f+l*d-c*u,t[e+1]=l*p+h*u+c*f-a*d,t[e+2]=c*p+h*d+a*u-l*f,t[e+3]=h*p-a*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),f=a(r/2),u=l(n/2),d=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"YZX":this._x=u*h*f+c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f-u*d*p;break;case"XZY":this._x=u*h*f-c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f+u*d*p;break;default:Gt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+a+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-i)*d}else if(n>a&&n>f){let d=2*Math.sqrt(1+n-a-f);this._w=(h-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+c)/d}else if(a>f){let d=2*Math.sqrt(1+a-n-f);this._w=(r-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-n-a);this._w=(o-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Kd=class Kd{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Hp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Hp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),f=2*(r*n-o*e);return this.x=e+l*c+o*f-a*h,this.y=n+l*h+a*c-r*f,this.z=i+l*f+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Gu.copy(this).projectOnVector(t),this.sub(Gu)}reflect(t){return this.sub(Gu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Kd.prototype.isVector3=!0;var W=Kd,Gu=new W,Hp=new ui,Qd=class Qd{constructor(t,e,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],_=i[0],m=i[3],g=i[6],v=i[1],E=i[4],y=i[7],M=i[2],b=i[5],x=i[8];return r[0]=o*_+a*v+l*M,r[3]=o*m+a*E+l*b,r[6]=o*g+a*y+l*x,r[1]=c*_+h*v+f*M,r[4]=c*m+h*E+f*b,r[7]=c*g+h*y+f*x,r[2]=u*_+d*v+p*M,r[5]=u*m+d*E+p*b,r[8]=u*g+d*y+p*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=h*o-a*c,u=a*l-h*r,d=c*r-o*l,p=e*f+n*u+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return t[0]=f*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-a*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Lr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hu.makeScale(t,e)),this}rotate(t){return Lr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hu.makeRotation(-t)),this}translate(t,e){return Lr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Qd.prototype.isMatrix3=!0;var qt=Qd,Hu=new qt,Vp=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wp=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ax(){let s={enabled:!0,workingColorSpace:Pa,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ye&&(i.r=Ts(i.r),i.g=Ts(i.g),i.b=Ts(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ye&&(i.r=Ao(i.r),i.g=Ao(i.g),i.b=Ao(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Cs?Ia:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Pa]:{primaries:t,whitePoint:n,transfer:Ia,toXYZ:Vp,fromXYZ:Wp,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:t,whitePoint:n,transfer:ye,toXYZ:Vp,fromXYZ:Wp,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),s}var le=Ax();function Ts(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ao(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var fo,Ic=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{fo===void 0&&(fo=La("canvas")),fo.width=t.width,fo.height=t.height;let i=fo.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=fo}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=La("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ts(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ts(e[n]/255)*255):e[n]=Ts(e[n]);return{data:e,width:t.width,height:t.height}}else return Gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Rx=0,Do=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rx++}),this.uuid=Xo(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Vu(i[o].image)):r.push(Vu(i[o]))}else r=Vu(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Vu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ic.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Gt("Texture: Unable to serialize Texture."),{})}var Cx=0,Wu=new W,Vn=class s extends is{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=ns,i=ns,r=Hn,o=Yi,a=Ji,l=jn,c=s.DEFAULT_ANISOTROPY,h=Cs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cx++}),this.uuid=Xo(),this.name="",this.source=new Do(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Wu).x}get height(){return this.source.getSize(Wu).y}get depth(){return this.source.getSize(Wu).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Gt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Gt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Co:t.x=t.x-Math.floor(t.x);break;case ns:t.x=t.x<0?0:1;break;case Cc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Co:t.y=t.y-Math.floor(t.y);break;case ns:t.y=t.y<0?0:1;break;case Cc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=Pd;Vn.DEFAULT_ANISOTROPY=1;var jd=class jd{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,y=(d+1)/2,M=(g+1)/2,b=(h+u)/4,x=(f+_)/4,S=(p+m)/4;return E>y&&E>M?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=b/n,r=x/n):y>M?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=b/i,r=S/i):M<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(M),n=x/r,i=S/r),this.set(n,i,r,e),this}let v=Math.sqrt((m-p)*(m-p)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-p)/v,this.y=(f-_)/v,this.z=(u-h)/v,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};jd.prototype.isVector4=!0;var Ne=jd,Lc=class extends is{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ne(0,0,t,e),this.scissorTest=!1,this.viewport=new Ne(0,0,t,e),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new Vn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Do(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},di=class extends Lc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Da=class extends Vn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=gn,this.minFilter=gn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Dc=class extends Vn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=gn,this.minFilter=gn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Qc=class Qc{constructor(t,e,n,i,r,o,a,l,c,h,f,u,d,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,f,u,d,p,_,m)}set(t,e,n,i,r,o,a,l,c,h,f,u,d,p,_,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=f,g[14]=u,g[3]=d,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qc().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/po.setFromMatrixColumn(t,0).length(),r=1/po.setFromMatrixColumn(t,1).length(),o=1/po.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=o*h,d=o*f,p=a*h,_=a*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+p*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=p+d*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,p=c*h,_=c*f;e[0]=u+_*a,e[4]=p*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=d*a-p,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,p=c*h,_=c*f;e[0]=u-_*a,e[4]=-o*f,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,d=o*f,p=a*h,_=a*f;e[0]=l*h,e[4]=p*c-d,e[8]=u*c+_,e[1]=l*f,e[5]=_*c+u,e[9]=d*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,d=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=_-u*f,e[8]=p*f+d,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*f+p,e[10]=u-_*f}else if(t.order==="XZY"){let u=o*l,d=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+_,e[5]=o*h,e[9]=d*f-p,e[2]=p*f-d,e[6]=a*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Px,t,Ix)}lookAt(t,e,n){let i=this.elements;return li.subVectors(t,e),li.lengthSq()===0&&(li.z=1),li.normalize(),Vs.crossVectors(n,li),Vs.lengthSq()===0&&(Math.abs(n.z)===1?li.x+=1e-4:li.z+=1e-4,li.normalize(),Vs.crossVectors(n,li)),Vs.normalize(),jl.crossVectors(li,Vs),i[0]=Vs.x,i[4]=jl.x,i[8]=li.x,i[1]=Vs.y,i[5]=jl.y,i[9]=li.y,i[2]=Vs.z,i[6]=jl.z,i[10]=li.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],_=n[6],m=n[10],g=n[14],v=n[3],E=n[7],y=n[11],M=n[15],b=i[0],x=i[4],S=i[8],R=i[12],A=i[1],D=i[5],I=i[9],F=i[13],L=i[2],B=i[6],G=i[10],O=i[14],$=i[3],V=i[7],C=i[11],K=i[15];return r[0]=o*b+a*A+l*L+c*$,r[4]=o*x+a*D+l*B+c*V,r[8]=o*S+a*I+l*G+c*C,r[12]=o*R+a*F+l*O+c*K,r[1]=h*b+f*A+u*L+d*$,r[5]=h*x+f*D+u*B+d*V,r[9]=h*S+f*I+u*G+d*C,r[13]=h*R+f*F+u*O+d*K,r[2]=p*b+_*A+m*L+g*$,r[6]=p*x+_*D+m*B+g*V,r[10]=p*S+_*I+m*G+g*C,r[14]=p*R+_*F+m*O+g*K,r[3]=v*b+E*A+y*L+M*$,r[7]=v*x+E*D+y*B+M*V,r[11]=v*S+E*I+y*G+M*C,r[15]=v*R+E*F+y*O+M*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],p=t[3],_=t[7],m=t[11],g=t[15],v=l*d-c*u,E=a*d-c*f,y=a*u-l*f,M=o*d-c*h,b=o*u-l*h,x=o*f-a*h;return e*(_*v-m*E+g*y)-n*(p*v-m*M+g*b)+i*(p*E-_*M+g*x)-r*(p*y-_*b+m*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],p=t[12],_=t[13],m=t[14],g=t[15],v=e*a-n*o,E=e*l-i*o,y=e*c-r*o,M=n*l-i*a,b=n*c-r*a,x=i*c-r*l,S=h*_-f*p,R=h*m-u*p,A=h*g-d*p,D=f*m-u*_,I=f*g-d*_,F=u*g-d*m,L=v*F-E*I+y*D+M*A-b*R+x*S;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/L;return t[0]=(a*F-l*I+c*D)*B,t[1]=(i*I-n*F-r*D)*B,t[2]=(_*x-m*b+g*M)*B,t[3]=(u*b-f*x-d*M)*B,t[4]=(l*A-o*F-c*R)*B,t[5]=(e*F-i*A+r*R)*B,t[6]=(m*y-p*x-g*E)*B,t[7]=(h*x-u*y+d*E)*B,t[8]=(o*I-a*A+c*S)*B,t[9]=(n*A-e*I-r*S)*B,t[10]=(p*b-_*y+g*v)*B,t[11]=(f*y-h*b-d*v)*B,t[12]=(a*R-o*D-l*S)*B,t[13]=(e*D-n*R+i*S)*B,t[14]=(_*E-p*M-m*v)*B,t[15]=(h*M-f*E+u*v)*B,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,f=a+a,u=r*c,d=r*h,p=r*f,_=o*h,m=o*f,g=a*f,v=l*c,E=l*h,y=l*f,M=n.x,b=n.y,x=n.z;return i[0]=(1-(_+g))*M,i[1]=(d+y)*M,i[2]=(p-E)*M,i[3]=0,i[4]=(d-y)*b,i[5]=(1-(u+g))*b,i[6]=(m+v)*b,i[7]=0,i[8]=(p+E)*x,i[9]=(m-v)*x,i[10]=(1-(u+_))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=po.set(i[0],i[1],i[2]).length(),a=po.set(i[4],i[5],i[6]).length(),l=po.set(i[8],i[9],i[10]).length();r<0&&(o=-o),Hi.copy(this);let c=1/o,h=1/a,f=1/l;return Hi.elements[0]*=c,Hi.elements[1]*=c,Hi.elements[2]*=c,Hi.elements[4]*=h,Hi.elements[5]*=h,Hi.elements[6]*=h,Hi.elements[8]*=f,Hi.elements[9]*=f,Hi.elements[10]*=f,e.setFromRotationMatrix(Hi),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,i,r,o,a=Ai,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===Ai)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Po)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Ai,l=!1){let c=this.elements,h=2/(e-t),f=2/(n-i),u=-(e+t)/(e-t),d=-(n+i)/(n-i),p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===Ai)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===Po)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Qc.prototype.isMatrix4=!0;var ge=Qc,po=new W,Hi=new ge,Px=new W(0,0,0),Ix=new W(1,1,1),Vs=new W,jl=new W,li=new W,Xp=new ge,qp=new ui,Ci=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return qp.setFromEuler(this),this.setFromQuaternion(qp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ci.DEFAULT_ORDER="XYZ";var Na=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Lx=0,Yp=new W,mo=new ui,ys=new ge,tc=new W,Sa=new W,Dx=new W,Nx=new ui,Zp=new W(1,0,0),$p=new W(0,1,0),Jp=new W(0,0,1),Kp={type:"added"},Ux={type:"removed"},go={type:"childadded",child:null},Xu={type:"childremoved",child:null},Ln=class s extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lx++}),this.uuid=Xo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new W,e=new Ci,n=new ui,i=new W(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ge},normalMatrix:{value:new qt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return mo.setFromAxisAngle(t,e),this.quaternion.multiply(mo),this}rotateOnWorldAxis(t,e){return mo.setFromAxisAngle(t,e),this.quaternion.premultiply(mo),this}rotateX(t){return this.rotateOnAxis(Zp,t)}rotateY(t){return this.rotateOnAxis($p,t)}rotateZ(t){return this.rotateOnAxis(Jp,t)}translateOnAxis(t,e){return Yp.copy(t).applyQuaternion(this.quaternion),this.position.add(Yp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zp,t)}translateY(t){return this.translateOnAxis($p,t)}translateZ(t){return this.translateOnAxis(Jp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ys.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?tc.copy(t):tc.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ys.lookAt(Sa,tc,this.up):ys.lookAt(tc,Sa,this.up),this.quaternion.setFromRotationMatrix(ys),i&&(ys.extractRotation(i.matrixWorld),mo.setFromRotationMatrix(ys),this.quaternion.premultiply(mo.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Kp),go.child=t,this.dispatchEvent(go),go.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ux),Xu.child=t,this.dispatchEvent(Xu),Xu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ys.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ys.multiply(t.parent.matrixWorld)),t.applyMatrix4(ys),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Kp),go.child=t,this.dispatchEvent(go),go.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sa,t,Dx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sa,Nx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ln.DEFAULT_UP=new W(0,1,0);Ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ri=class extends Ln{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ox={type:"move"},No=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&u>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ox)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ri;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},jm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ws={h:0,s:0,l:0},ec={h:0,s:0,l:0};function qu(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Xt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=le.workingColorSpace){if(t=Hd(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=qu(o,r,t+1/3),this.g=qu(o,r,t),this.b=qu(o,r,t-1/3)}return le.colorSpaceToWorking(this,i),this}setStyle(t,e=Sn){function n(r){r!==void 0&&parseFloat(r)<1&&Gt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Gt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Gt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Sn){let n=jm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Gt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ts(t.r),this.g=Ts(t.g),this.b=Ts(t.b),this}copyLinearToSRGB(t){return this.r=Ao(t.r),this.g=Ao(t.g),this.b=Ao(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Sn){return le.workingToColorSpace(Pn.copy(this),t),Math.round(Qt(Pn.r*255,0,255))*65536+Math.round(Qt(Pn.g*255,0,255))*256+Math.round(Qt(Pn.b*255,0,255))}getHexString(t=Sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.workingToColorSpace(Pn.copy(this),e);let n=Pn.r,i=Pn.g,r=Pn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let f=o-a;switch(c=h<=.5?f/(o+a):f/(2-o-a),o){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=le.workingColorSpace){return le.workingToColorSpace(Pn.copy(this),e),t.r=Pn.r,t.g=Pn.g,t.b=Pn.b,t}getStyle(t=Sn){le.workingToColorSpace(Pn.copy(this),t);let e=Pn.r,n=Pn.g,i=Pn.b;return t!==Sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ws),this.setHSL(Ws.h+t,Ws.s+e,Ws.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ws),t.getHSL(ec);let n=Ra(Ws.h,ec.h,e),i=Ra(Ws.s,ec.s,e),r=Ra(Ws.l,ec.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pn=new Xt;Xt.NAMES=jm;var Ua=class s{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xt(t),this.density=e}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Uo=class extends Ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ci,this.environmentIntensity=1,this.environmentRotation=new Ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Vi=new W,Ss=new W,Yu=new W,Ms=new W,_o=new W,xo=new W,Qp=new W,Zu=new W,$u=new W,Ju=new W,Ku=new Ne,Qu=new Ne,ju=new Ne,Zs=class s{constructor(t=new W,e=new W,n=new W){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Vi.subVectors(t,e),i.cross(Vi);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Vi.subVectors(i,e),Ss.subVectors(n,e),Yu.subVectors(t,e);let o=Vi.dot(Vi),a=Vi.dot(Ss),l=Vi.dot(Yu),c=Ss.dot(Ss),h=Ss.dot(Yu),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ms)===null?!1:Ms.x>=0&&Ms.y>=0&&Ms.x+Ms.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,Ms)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ms.x),l.addScaledVector(o,Ms.y),l.addScaledVector(a,Ms.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return Ku.setScalar(0),Qu.setScalar(0),ju.setScalar(0),Ku.fromBufferAttribute(t,e),Qu.fromBufferAttribute(t,n),ju.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Ku,r.x),o.addScaledVector(Qu,r.y),o.addScaledVector(ju,r.z),o}static isFrontFacing(t,e,n,i){return Vi.subVectors(n,e),Ss.subVectors(t,e),Vi.cross(Ss).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Vi.subVectors(this.c,this.b),Ss.subVectors(this.a,this.b),Vi.cross(Ss).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;_o.subVectors(i,n),xo.subVectors(r,n),Zu.subVectors(t,n);let l=_o.dot(Zu),c=xo.dot(Zu);if(l<=0&&c<=0)return e.copy(n);$u.subVectors(t,i);let h=_o.dot($u),f=xo.dot($u);if(h>=0&&f<=h)return e.copy(i);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),e.copy(n).addScaledVector(_o,o);Ju.subVectors(t,r);let d=_o.dot(Ju),p=xo.dot(Ju);if(p>=0&&d<=p)return e.copy(r);let _=d*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(xo,a);let m=h*p-d*f;if(m<=0&&f-h>=0&&d-p>=0)return Qp.subVectors(r,i),a=(f-h)/(f-h+(d-p)),e.copy(i).addScaledVector(Qp,a);let g=1/(m+_+u);return o=_*g,a=u*g,e.copy(n).addScaledVector(_o,o).addScaledVector(xo,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ss=class{constructor(t=new W(1/0,1/0,1/0),e=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Wi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Wi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Wi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Wi):Wi.fromBufferAttribute(r,o),Wi.applyMatrix4(t.matrixWorld),this.expandByPoint(Wi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),nc.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),nc.copy(n.boundingBox)),nc.applyMatrix4(t.matrixWorld),this.union(nc)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Wi),Wi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ma),ic.subVectors(this.max,Ma),vo.subVectors(t.a,Ma),yo.subVectors(t.b,Ma),So.subVectors(t.c,Ma),Xs.subVectors(yo,vo),qs.subVectors(So,yo),Rr.subVectors(vo,So);let e=[0,-Xs.z,Xs.y,0,-qs.z,qs.y,0,-Rr.z,Rr.y,Xs.z,0,-Xs.x,qs.z,0,-qs.x,Rr.z,0,-Rr.x,-Xs.y,Xs.x,0,-qs.y,qs.x,0,-Rr.y,Rr.x,0];return!td(e,vo,yo,So,ic)||(e=[1,0,0,0,1,0,0,0,1],!td(e,vo,yo,So,ic))?!1:(sc.crossVectors(Xs,qs),e=[sc.x,sc.y,sc.z],td(e,vo,yo,So,ic))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Wi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Wi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},bs=[new W,new W,new W,new W,new W,new W,new W,new W],Wi=new W,nc=new ss,vo=new W,yo=new W,So=new W,Xs=new W,qs=new W,Rr=new W,Ma=new W,ic=new W,sc=new W,Cr=new W;function td(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Cr.fromArray(s,r);let a=i.x*Math.abs(Cr.x)+i.y*Math.abs(Cr.y)+i.z*Math.abs(Cr.z),l=t.dot(Cr),c=e.dot(Cr),h=n.dot(Cr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var tn=new W,rc=new ne,Fx=0,hi=class extends is{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Fx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=qm,this.updateRanges=[],this.gpuType=Di,this.version=0,this._normalizationScale=t!==void 0?Wd(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)rc.fromBufferAttribute(this,e),rc.applyMatrix3(t),this.setXY(e,rc.x,rc.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.applyMatrix3(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.applyMatrix4(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.applyNormalMatrix(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.transformDirection(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Km(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Qm(t,this.array)}};var Oa=class extends hi{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Fa=class extends hi{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ln=class extends hi{constructor(t,e,n){super(new Float32Array(t),e,n)}},Bx=new ss,ba=new W,ed=new W,$s=class{constructor(t=new W,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Bx.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ba.subVectors(t,this.center);let e=ba.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ba,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ed.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ba.copy(t.center).add(ed)),this.expandByPoint(ba.copy(t.center).sub(ed))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},zx=0,Ei=new ge,nd=new Ln,Mo=new W,ci=new ss,wa=new ss,mn=new W,Pi=class s extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zx++}),this.uuid=Xo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hx(t)?Fa:Oa)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ei.makeRotationFromQuaternion(t),this.applyMatrix4(Ei),this}rotateX(t){return Ei.makeRotationX(t),this.applyMatrix4(Ei),this}rotateY(t){return Ei.makeRotationY(t),this.applyMatrix4(Ei),this}rotateZ(t){return Ei.makeRotationZ(t),this.applyMatrix4(Ei),this}translate(t,e,n){return Ei.makeTranslation(t,e,n),this.applyMatrix4(Ei),this}scale(t,e,n){return Ei.makeScale(t,e,n),this.applyMatrix4(Ei),this}lookAt(t){return nd.lookAt(t),nd.updateMatrix(),this.applyMatrix4(nd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mo).negate(),this.translate(Mo.x,Mo.y,Mo.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ln(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ss);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];ci.setFromBufferAttribute(r),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $s);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(t){let n=this.boundingSphere.center;if(ci.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];wa.setFromBufferAttribute(a),this.morphTargetsRelative?(mn.addVectors(ci.min,wa.min),ci.expandByPoint(mn),mn.addVectors(ci.max,wa.max),ci.expandByPoint(mn)):(ci.expandByPoint(wa.min),ci.expandByPoint(wa.max))}ci.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)mn.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(mn));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)mn.fromBufferAttribute(a,c),l&&(Mo.fromBufferAttribute(t,c),mn.add(Mo)),i=Math.max(i,n.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new hi(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let R=0;R<n.count;R++)a[R]=new W,l[R]=new W;let h=new W,f=new W,u=new W,d=new ne,p=new ne,_=new ne,m=new W,g=new W;function v(R,A,D){c[R]=c[A]=c[D]=1,h.fromBufferAttribute(n,R),f.fromBufferAttribute(n,A),u.fromBufferAttribute(n,D),d.fromBufferAttribute(r,R),p.fromBufferAttribute(r,A),_.fromBufferAttribute(r,D),f.sub(h),u.sub(h),p.sub(d),_.sub(d);let I=1/(p.x*_.y-_.x*p.y);isFinite(I)&&(m.copy(f).multiplyScalar(_.y).addScaledVector(u,-p.y).multiplyScalar(I),g.copy(u).multiplyScalar(p.x).addScaledVector(f,-_.x).multiplyScalar(I),a[R].add(m),a[A].add(m),a[D].add(m),l[R].add(g),l[A].add(g),l[D].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let R=0,A=E.length;R<A;++R){let D=E[R],I=D.start,F=D.count;for(let L=I,B=I+F;L<B;L+=3)v(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let y=new W,M=new W,b=new W,x=new W;function S(R){b.fromBufferAttribute(i,R),x.copy(b);let A=a[R];y.copy(A),y.sub(b.multiplyScalar(b.dot(A))).normalize(),M.crossVectors(x,A);let I=M.dot(l[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,I)}for(let R=0,A=n.count;R<A;++R)c[R]&&S(R);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new hi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new W,r=new W,o=new W,a=new W,l=new W,c=new W,h=new W,f=new W;if(t)for(let u=0,d=t.count;u<d;u+=3){let p=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),f.subVectors(i,r),h.cross(f),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)mn.fromBufferAttribute(t,e),mn.normalize(),t.setXYZ(e,mn.x,mn.y,mn.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,f=a.normalized,u=new c.constructor(l.length*h),d=0,p=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let g=0;g<h;g++)u[p++]=c[d++]}return new hi(u,h,f)}if(this.index===null)return Gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var id=new W,kx=new W,Gx=new qt,Xi=class{constructor(t=new W(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=id.subVectors(n,e).cross(kx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(id),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Gx.getNormalMatrix(t),i=this.coplanarPoint(id).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Hx=0,Js=class extends is{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hx++}),this.uuid=Xo(),this.name="",this.type="Material",this.blending=Ho,this.side=ir,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sd,this.blendDst=Md,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=Ro,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=km,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sc,this.stencilZFail=Sc,this.stencilZPass=Sc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Gt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Gt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Xt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Xi().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ne().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ne().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ws=new W,sd=new W,oc=new W,ac=new W,Nc=class{constructor(t=new W,e=new W(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ws)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ws.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ws.copy(this.origin).addScaledVector(this.direction,e),ws.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){sd.copy(t).add(e).multiplyScalar(.5),oc.copy(e).sub(t).normalize(),ac.copy(this.origin).sub(sd);let r=t.distanceTo(e)*.5,o=-this.direction.dot(oc),a=ac.dot(this.direction),l=-ac.dot(oc),c=ac.lengthSq(),h=Math.abs(1-o*o),f,u,d,p;if(h>0)if(f=o*l-a,u=o*a-l,p=r*h,f>=0)if(u>=-p)if(u<=p){let _=1/h;f*=_,u*=_,d=f*(f+o*u+2*a)+u*(o*f+u+2*l)+c}else u=r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u<=-p?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=p?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(sd).addScaledVector(oc,u),d}intersectSphere(t,e){if(t.radius<0)return null;ws.subVectors(t.center,this.origin);let n=ws.dot(this.direction),i=ws.dot(ws)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),f>=0?(a=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,ws)!==null}intersectTriangle(t,e,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,f=t.x-o.x,u=t.y-o.y,d=t.z-o.z,p=e.x-o.x,_=e.y-o.y,m=e.z-o.z,g=n.x-o.x,v=n.y-o.y,E=n.z-o.z,y=Math.abs(l),M=Math.abs(c),b=Math.abs(h),x,S,R,A,D,I,F,L,B,G,O,$;if(y>=M&&y>=b?(R=l,I=f,B=p,$=g,l>=0?(x=c,S=h,A=u,D=d,F=_,L=m,G=v,O=E):(x=h,S=c,A=d,D=u,F=m,L=_,G=E,O=v)):M>=b?(R=c,I=u,B=_,$=v,c>=0?(x=h,S=l,A=d,D=f,F=m,L=p,G=E,O=g):(x=l,S=h,A=f,D=d,F=p,L=m,G=g,O=E)):(R=h,I=d,B=m,$=E,h>=0?(x=l,S=c,A=f,D=u,F=p,L=_,G=g,O=v):(x=c,S=l,A=u,D=f,F=_,L=p,G=v,O=g)),R===0)return null;let V=x/R,C=S/R,K=1/R,gt=A-V*I,j=D-C*I,z=F-V*B,it=L-C*B,ut=G-V*$,bt=O-C*$,lt=ut*it-bt*z,Ct=gt*bt-j*ut,re=z*j-it*gt;if(i){if(lt<0||Ct<0||re<0)return null}else if((lt<0||Ct<0||re<0)&&(lt>0||Ct>0||re>0))return null;let Pt=lt+Ct+re;if(Pt===0)return null;let Ht=K*(lt*I+Ct*B+re*$);return(Pt>0?Ht<0:Ht>0)?null:this.at(Ht/Pt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Uc=class extends Js{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.combine=bd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},jp=new ge,Pr=new Nc,lc=new $s,tm=new W,cc=new W,hc=new W,uc=new W,rd=new W,dc=new W,em=new W,fc=new W,Ie=class extends Ln{constructor(t=new Pi,e=new Uc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){dc.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],f=r[l];h!==0&&(rd.fromBufferAttribute(f,t),o?dc.addScaledVector(rd,h):dc.addScaledVector(rd.sub(e),h))}e.add(dc)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lc.copy(n.boundingSphere),lc.applyMatrix4(r),Pr.copy(t.ray).recast(t.near),!(lc.containsPoint(Pr.origin)===!1&&(Pr.intersectSphere(lc,tm)===null||Pr.origin.distanceToSquared(tm)>(t.far-t.near)**2))&&(jp.copy(r).invert(),Pr.copy(t.ray).applyMatrix4(jp),!(n.boundingBox!==null&&Pr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pr)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let m=u[p],g=o[m.materialIndex],v=Math.max(m.start,d.start),E=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=v,M=E;y<M;y+=3){let b=a.getX(y),x=a.getX(y+1),S=a.getX(y+2);i=pc(this,g,t,n,c,h,f,b,x,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){let v=a.getX(m),E=a.getX(m+1),y=a.getX(m+2);i=pc(this,o,t,n,c,h,f,v,E,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let m=u[p],g=o[m.materialIndex],v=Math.max(m.start,d.start),E=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=v,M=E;y<M;y+=3){let b=y,x=y+1,S=y+2;i=pc(this,g,t,n,c,h,f,b,x,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){let v=m,E=m+1,y=m+2;i=pc(this,o,t,n,c,h,f,v,E,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function Vx(s,t,e,n,i,r,o,a){let l;if(t.side===Mn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===ir,a),l===null)return null;fc.copy(a),fc.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(fc);return c<e.near||c>e.far?null:{distance:c,point:fc.clone(),object:s}}function pc(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,cc),s.getVertexPosition(l,hc),s.getVertexPosition(c,uc);let h=Vx(s,t,e,n,cc,hc,uc,em);if(h){let f=new W;Zs.getBarycoord(em,cc,hc,uc,f),i&&(h.uv=Zs.getInterpolatedAttribute(i,a,l,c,f,new ne)),r&&(h.uv1=Zs.getInterpolatedAttribute(r,a,l,c,f,new ne)),o&&(h.normal=Zs.getInterpolatedAttribute(o,a,l,c,f,new W),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new W,materialIndex:0};Zs.getNormal(cc,hc,uc,u.normal),h.face=u,h.barycoord=f}return h}var Ba=class extends Vn{constructor(t=null,e=1,n=1,i,r,o,a,l,c=gn,h=gn,f,u){super(null,o,a,l,c,h,i,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Oo=class extends hi{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},bo=new ge,nm=new ge,mc=[],im=new ss,Wx=new ge,Ta=new Ie,Ea=new $s,Ks=class extends Ie{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Oo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Wx)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ss),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bo),im.copy(t.boundingBox).applyMatrix4(bo),this.boundingBox.union(im)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new $s),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bo),Ea.copy(t.boundingSphere).applyMatrix4(bo),this.boundingSphere.union(Ea)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Ta.geometry=this.geometry,Ta.material=this.material,Ta.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ea.copy(this.boundingSphere),Ea.applyMatrix4(n),t.ray.intersectsSphere(Ea)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,bo),nm.multiplyMatrices(n,bo),Ta.matrixWorld=nm,Ta.raycast(t,mc);for(let o=0,a=mc.length;o<a;o++){let l=mc[o];l.instanceId=r,l.object=this,e.push(l)}mc.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Oo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ba(new Float32Array(i*this.count),i,this.count,rh,Di));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ir=new $s,Xx=new ne(.5,.5),gc=new W,Qs=class{constructor(t=new Xi,e=new Xi,n=new Xi,i=new Xi,r=new Xi,o=new Xi){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ai,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],_=r[9],m=r[10],g=r[11],v=r[12],E=r[13],y=r[14],M=r[15];if(i[0].setComponents(c-o,d-h,g-p,M-v).normalize(),i[1].setComponents(c+o,d+h,g+p,M+v).normalize(),i[2].setComponents(c+a,d+f,g+_,M+E).normalize(),i[3].setComponents(c-a,d-f,g-_,M-E).normalize(),n)i[4].setComponents(l,u,m,y).normalize(),i[5].setComponents(c-l,d-u,g-m,M-y).normalize();else if(i[4].setComponents(c-l,d-u,g-m,M-y).normalize(),e===Ai)i[5].setComponents(c+l,d+u,g+m,M+y).normalize();else if(e===Po)i[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ir.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ir.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ir)}intersectsSprite(t){Ir.center.set(0,0,0);let e=Xx.distanceTo(t.center);return Ir.radius=.7071067811865476+e,Ir.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ir)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(gc.x=i.normal.x>0?t.max.x:t.min.x,gc.y=i.normal.y>0?t.max.y:t.min.y,gc.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(gc)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},sm=new ge,Oc=class s{constructor(){this.coordinateSystem=Ai,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];sm.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new Qs),n[i].setFromProjectionMatrix(sm,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new Qs),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};var za=class extends Vn{constructor(t=[],e=Fr,n,i,r,o,a,l,c,h){super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ka=class extends Vn{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var As=class extends Vn{constructor(t,e,n=Zi,i,r,o,a=gn,l=gn,c,h=Es,f=1){if(h!==Es&&h!==Rs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Do(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ga=class extends As{constructor(t,e=Zi,n=Fr,i,r,o=gn,a=gn,l,c=Es){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,i,r,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ha=class extends Vn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},qi=class s extends Pi{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],f=[],u=0,d=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ln(c,3)),this.setAttribute("normal",new ln(h,3)),this.setAttribute("uv",new ln(f,2));function p(_,m,g,v,E,y,M,b,x,S,R){let A=y/x,D=M/S,I=y/2,F=M/2,L=b/2,B=x+1,G=S+1,O=0,$=0,V=new W;for(let C=0;C<G;C++){let K=C*D-F;for(let gt=0;gt<B;gt++){let j=gt*A-I;V[_]=j*v,V[m]=K*E,V[g]=L,c.push(V.x,V.y,V.z),V[_]=0,V[m]=0,V[g]=b>0?1:-1,h.push(V.x,V.y,V.z),f.push(gt/x),f.push(1-C/S),O+=1}}for(let C=0;C<S;C++)for(let K=0;K<x;K++){let gt=u+K+B*C,j=u+K+B*(C+1),z=u+(K+1)+B*(C+1),it=u+(K+1)+B*C;l.push(gt,j,it),l.push(j,z,it),$+=6}a.addGroup(d,$,R),d+=$,u+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ii=class s extends Pi{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],f=[],u=[],d=[],p=0,_=[],m=n/2,g=0;v(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ln(f,3)),this.setAttribute("normal",new ln(u,3)),this.setAttribute("uv",new ln(d,2));function v(){let y=new W,M=new W,b=0,x=(e-t)/n;for(let S=0;S<=r;S++){let R=[],A=S/r,D=A*(e-t)+t;for(let I=0;I<=i;I++){let F=I/i,L=F*l+a,B=Math.sin(L),G=Math.cos(L);M.x=D*B,M.y=-A*n+m,M.z=D*G,f.push(M.x,M.y,M.z),y.set(B,x,G).normalize(),u.push(y.x,y.y,y.z),d.push(F,1-A),R.push(p++)}_.push(R)}for(let S=0;S<i;S++)for(let R=0;R<r;R++){let A=_[R][S],D=_[R+1][S],I=_[R+1][S+1],F=_[R][S+1];(t>0||R!==0)&&(h.push(A,D,F),b+=3),(e>0||R!==r-1)&&(h.push(D,I,F),b+=3)}c.addGroup(g,b,0),g+=b}function E(y){let M=p,b=new ne,x=new W,S=0,R=y===!0?t:e,A=y===!0?1:-1;for(let I=1;I<=i;I++)f.push(0,m*A,0),u.push(0,A,0),d.push(.5,.5),p++;let D=p;for(let I=0;I<=i;I++){let L=I/i*l+a,B=Math.cos(L),G=Math.sin(L);x.x=R*G,x.y=m*A,x.z=R*B,f.push(x.x,x.y,x.z),u.push(0,A,0),b.x=B*.5+.5,b.y=G*.5*A+.5,d.push(b.x,b.y),p++}for(let I=0;I<i;I++){let F=M+I,L=D+I;y===!0?h.push(L,L+1,F):h.push(L+1,L,F),S+=3}c.addGroup(g,S,y===!0?1:2),g+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Va=class s extends Ii{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Fc=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Gt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,d=(o-h)/u;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new ne:new W);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new W,i=[],r=[],o=[],a=new W,l=new ge;for(let d=0;d<=t;d++){let p=d/t;i[d]=this.getTangentAt(p,new W)}r[0]=new W,o[0]=new W;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Qt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Qt(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],d*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}};function Xd(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,f){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+f)+(l-a)/f;u*=h,d*=h,i(o,a,u,d)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var rm=new W,om=new W,od=new Xd,ad=new Xd,ld=new Xd,Fo=class extends Fc{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new W){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(om.subVectors(i[0],i[1]).add(i[0]),c=om);let f=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(rm.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=rm),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),p<1e-4&&(p=_),m<1e-4&&(m=_),od.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,p,_,m),ad.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,p,_,m),ld.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,p,_,m)}else this.curveType==="catmullrom"&&(od.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),ad.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),ld.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(od.calc(l),ad.calc(l),ld.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new W().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};var js=class s extends Pi{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,f=t/a,u=e/l,d=[],p=[],_=[],m=[];for(let g=0;g<h;g++){let v=g*u-o;for(let E=0;E<c;E++){let y=E*f-r;p.push(y,-v,0),_.push(0,0,1),m.push(E/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<a;v++){let E=v+c*g,y=v+c*(g+1),M=v+1+c*(g+1),b=v+1+c*g;d.push(E,y,b),d.push(y,M,b)}this.setIndex(d),this.setAttribute("position",new ln(p,3)),this.setAttribute("normal",new ln(_,3)),this.setAttribute("uv",new ln(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Dr=class s extends Pi{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],f=new W,u=new W,d=[],p=[],_=[],m=[];for(let g=0;g<=n;g++){let v=[],E=g/n,y=o+E*a,M=t*Math.cos(y),b=Math.sqrt(t*t-M*M),x=0;g===0&&o===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let S=0;S<=e;S++){let R=S/e,A=i+R*r;f.x=-b*Math.cos(A),f.y=M,f.z=b*Math.sin(A),p.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(R+x,1-E),v.push(c++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<e;v++){let E=h[g][v+1],y=h[g][v],M=h[g+1][v],b=h[g+1][v+1];(g!==0||o>0)&&d.push(E,y,b),(g!==n-1||l<Math.PI)&&d.push(y,M,b)}this.setIndex(d),this.setAttribute("position",new ln(p,3)),this.setAttribute("normal",new ln(_,3)),this.setAttribute("uv",new ln(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function zr(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(am(i))i.isRenderTargetTexture?(Gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(am(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function Dn(s){let t={};for(let e=0;e<s.length;e++){let n=zr(s[e]);for(let i in n)t[i]=n[i]}return t}function am(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function qx(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function qd(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}var tg={clone:zr,merge:Dn},Yx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Li=class extends Js{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yx,this.fragmentShader=Zx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zr(t.uniforms),this.uniformsGroups=qx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new Xt().setHex(i.value);break;case"v2":this.uniforms[n].value=new ne().fromArray(i.value);break;case"v3":this.uniforms[n].value=new W().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ne().fromArray(i.value);break;case"m3":this.uniforms[n].value=new qt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ge().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Bc=class extends Li{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},jt=class extends Js{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zh,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Bo=class extends jt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Xt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Xt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Xt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(t){this._diffuseRoughness>0!=t>0&&this.version++,this._diffuseRoughness=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}get iridescenceThicknessRange(){return Lr('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(t){Lr('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=t[0],this.iridescenceThicknessMaximum=t[1]}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.diffuseRoughness=t.diffuseRoughness,this.diffuseRoughnessMap=t.diffuseRoughnessMap,this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum,this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var zc=class extends Js{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},kc=class extends Js{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function wo(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function _c(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var tr=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Gc=class extends tr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ud,endingEnd:ud}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case dd:r=t,a=2*e-n;break;case fd:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case dd:o=t,l=2*n-e;break;case fd:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),_=p*p,m=_*p,g=-u*m+2*u*_-u*p,v=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*p+1,E=(-1-d)*m+(1.5+d)*_+.5*p,y=d*m-d*_;for(let M=0;M!==a;++M)r[M]=g*o[h+M]+v*o[c+M]+E*o[l+M]+y*o[f+M];return r}},Hc=class extends tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),f=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*f+o[l+u]*h;return r}},Vc=class extends tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Wc=class extends tr{interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,f=this.outTangents;if(!h||!f){let p=(n-e)/(i-e),_=1-p;for(let m=0;m!==a;++m)r[m]=o[c+m]*_+o[l+m]*p;return r}let u=a*2,d=t-1;for(let p=0;p!==a;++p){let _=o[c+p],m=o[l+p],g=d*u+p*2,v=f[g],E=f[g+1],y=t*u+p*2,M=h[y],b=h[y+1],x=Jx(n,e,v,M,i);r[p]=eg(x,_,E,b,m)}return r}};function eg(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function $x(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function Jx(s,t,e,n,i){let r=(s-t)/(i-t);for(let o=0;o<8;o++){let a=eg(r,t,e,n,i)-s;if(Math.abs(a)<1e-10)break;let l=$x(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var fi=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=wo(e,this.TimeBufferType),this.values=wo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:wo(t.times,Array),values:wo(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),_c(t.settings)&&(n.settings={inTangents:wo(t.settings.inTangents,Array),outTangents:wo(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Vc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Hc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Gc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Wc(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ca:e=this.InterpolantFactoryMethodDiscrete;break;case Pc:e=this.InterpolantFactoryMethodLinear;break;case yc:e=this.InterpolantFactoryMethodSmooth;break;case hd:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Gt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ca;case this.InterpolantFactoryMethodLinear:return Pc;case this.InterpolantFactoryMethodSmooth:return yc;case this.InterpolantFactoryMethodBezier:return hd}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;_c(this.settings)&&(lm(this.settings.inTangents,t),lm(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;_c(this.settings)&&(cm(this.settings.inTangents,t),cm(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Vt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Vt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&ux(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){Vt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===yc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let f=a*n,u=f-n,d=f+n;for(let p=0;p!==n;++p){let _=e[f+p];if(_!==e[u+p]||_!==e[d+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let f=a*n,u=o*n;for(let d=0;d!==n;++d)e[u+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,_c(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function lm(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]+=t}function cm(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}fi.prototype.ValueTypeName="";fi.prototype.TimeBufferType=Float32Array;fi.prototype.ValueBufferType=Float32Array;fi.prototype.DefaultInterpolation=Pc;var er=class extends fi{constructor(t,e,n){super(t,e,n)}};er.prototype.ValueTypeName="bool";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=Ca;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;var Xc=class extends fi{constructor(t,e,n,i){super(t,e,n,i)}};Xc.prototype.ValueTypeName="color";var qc=class extends fi{constructor(t,e,n,i){super(t,e,n,i)}};qc.prototype.ValueTypeName="number";var Yc=class extends tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)ui.slerpFlat(r,0,o,c-a,o,c,l);return r}},Wa=class extends fi{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Yc(this.times,this.values,this.getValueSize(),t)}};Wa.prototype.ValueTypeName="quaternion";Wa.prototype.InterpolantFactoryMethodSmooth=void 0;var nr=class extends fi{constructor(t,e,n){super(t,e,n)}};nr.prototype.ValueTypeName="string";nr.prototype.ValueBufferType=Array;nr.prototype.DefaultInterpolation=Ca;nr.prototype.InterpolantFactoryMethodLinear=void 0;nr.prototype.InterpolantFactoryMethodSmooth=void 0;var Zc=class extends fi{constructor(t,e,n,i){super(t,e,n,i)}};Zc.prototype.ValueTypeName="vector";var $c=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},ng=new $c,Jc=class{constructor(t){this.manager=t!==void 0?t:ng,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Jc.DEFAULT_MATERIAL_NAME="__DEFAULT";var zo=class extends Ln{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Xa=class extends zo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ln.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},cd=new ge,hm=new W,um=new W,qa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=jn,this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qs,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new Ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;hm.setFromMatrixPosition(t.matrixWorld),e.position.copy(hm),um.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(um),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){cd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(cd,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===Po||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(cd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},xc=new W,vc=new ui,es=new W,Ya=class extends Ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=Ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(xc,vc,es),es.x===1&&es.y===1&&es.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xc,vc,es.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(xc,vc,es),es.x===1&&es.y===1&&es.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xc,vc,es.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ys=new W,dm=new ne,fm=new ne,In=class extends Ya{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Lo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Aa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Lo*2*Math.atan(Math.tan(Aa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ys.x,Ys.y).multiplyScalar(-t/Ys.z),Ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ys.x,Ys.y).multiplyScalar(-t/Ys.z)}getViewSize(t,e){return this.getViewBounds(t,dm,fm),e.subVectors(fm,dm)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Aa*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var pd=class extends qa{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0}},Za=class extends zo{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new pd}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},$a=class extends Ya{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},md=class extends qa{constructor(){super(new $a(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ja=class extends zo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ln.DEFAULT_UP),this.updateMatrix(),this.target=new Ln,this.shadow=new md}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var To=-90,Eo=1,ko=class extends Ln{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new In(To,Eo,t,e);i.layers=this.layers,this.add(i);let r=new In(To,Eo,t,e);r.layers=this.layers,this.add(r);let o=new In(To,Eo,t,e);o.layers=this.layers,this.add(o);let a=new In(To,Eo,t,e);a.layers=this.layers,this.add(a);let l=new In(To,Eo,t,e);l.layers=this.layers,this.add(l);let c=new In(To,Eo,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Ai)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Po)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Kc=class extends In{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Yd="\\[\\]\\.:\\/",Kx=new RegExp("["+Yd+"]","g"),Zd="[^"+Yd+"]",Qx="[^"+Yd.replace("\\.","")+"]",jx=/((?:WC+[\/:])*)/.source.replace("WC",Zd),tv=/(WCOD+)?/.source.replace("WCOD",Qx),ev=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zd),nv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zd),iv=new RegExp("^"+jx+tv+ev+nv+"$"),sv=["material","materials","bones","map"],gd=class{constructor(t,e,n){let i=n||Pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Pe=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Kx,"")}static parseTrackName(t){let e=iv.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);sv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Gt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;Vt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pe.Composite=gd;Pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pe.prototype.GetterByBindingType=[Pe.prototype._getValue_direct,Pe.prototype._getValue_array,Pe.prototype._getValue_arrayElement,Pe.prototype._getValue_toArray];Pe.prototype.SetterByBindingTypeAndVersioning=[[Pe.prototype._setValue_direct,Pe.prototype._setValue_direct_setNeedsUpdate,Pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_array,Pe.prototype._setValue_array_setNeedsUpdate,Pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_arrayElement,Pe.prototype._setValue_arrayElement_setNeedsUpdate,Pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_fromArray,Pe.prototype._setValue_fromArray_setNeedsUpdate,Pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var VT=new Float32Array(1);var tf=class tf{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};tf.prototype.isMatrix2=!0;var _d=tf;function $d(s,t,e,n){let i=rv(n);switch(e){case Ud:return s*t;case rh:return s*t/i.components*i.byteLength;case oh:return s*t/i.components*i.byteLength;case sr:return s*t*2/i.components*i.byteLength;case ah:return s*t*2/i.components*i.byteLength;case Od:return s*t*3/i.components*i.byteLength;case Ji:return s*t*4/i.components*i.byteLength;case lh:return s*t*4/i.components*i.byteLength;case tl:case el:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case nl:case il:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case hh:case dh:return Math.max(s,16)*Math.max(t,8)/4;case ch:case uh:return Math.max(s,8)*Math.max(t,8)/2;case fh:case ph:case gh:case _h:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case mh:case sl:case xh:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case vh:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case yh:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Sh:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Mh:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case bh:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case wh:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Th:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Eh:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ah:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Rh:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ch:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Ph:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ih:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Lh:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Dh:case Nh:case Uh:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Oh:case Fh:return Math.ceil(s/4)*Math.ceil(t/4)*8;case rl:case Bh:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function rv(s){switch(s){case jn:case Id:return{byteLength:1,components:1};case Wo:case Ld:case $i:return{byteLength:2,components:1};case ih:case sh:return{byteLength:2,components:4};case Zi:case nh:case Di:return{byteLength:4,components:1};case Dd:case Nd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function wg(){let s=null,t=!1,e=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),e(r,o)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function dv(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){let h=l.array,f=l.updateRanges;if(s.bindBuffer(c,a),f.length===0)s.bufferSubData(c,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){let p=f[u],_=f[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){let _=f[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var fv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_v=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Mv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ev=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Av=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Iv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Dv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Uv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ov=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Bv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Xv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,qv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$v=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ty=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ey=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ny=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,sy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ry=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,oy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ay=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ly=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hy=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,uy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,py=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,my=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_y=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,My=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,by=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ty=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ey=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ay=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ry=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Py=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Iy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ly=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ny=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Uy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Oy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,By=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Hy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,$y=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Jy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ky=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,tS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,eS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,oS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,aS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,uS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,dS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mS=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_S=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,vS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,yS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,SS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,MS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,TS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ES=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,AS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,IS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,DS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,NS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,US=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,FS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,GS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,HS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,WS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,XS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:fv,alphahash_pars_fragment:pv,alphamap_fragment:mv,alphamap_pars_fragment:gv,alphatest_fragment:_v,alphatest_pars_fragment:xv,aomap_fragment:vv,aomap_pars_fragment:yv,batching_pars_vertex:Sv,batching_vertex:Mv,begin_vertex:bv,beginnormal_vertex:wv,bsdfs:Tv,iridescence_fragment:Ev,bumpmap_pars_fragment:Av,clipping_planes_fragment:Rv,clipping_planes_pars_fragment:Cv,clipping_planes_pars_vertex:Pv,clipping_planes_vertex:Iv,color_fragment:Lv,color_pars_fragment:Dv,color_pars_vertex:Nv,color_vertex:Uv,common:Ov,defaultnormal_vertex:Fv,displacementmap_pars_vertex:Bv,displacementmap_vertex:zv,emissivemap_fragment:kv,emissivemap_pars_fragment:Gv,colorspace_fragment:Hv,colorspace_pars_fragment:Vv,envmap_fragment:Wv,envmap_common_pars_fragment:Xv,envmap_pars_fragment:qv,envmap_pars_vertex:Yv,envmap_physical_pars_fragment:sy,envmap_vertex:Zv,fog_vertex:$v,fog_pars_vertex:Jv,fog_fragment:Kv,fog_pars_fragment:Qv,gradientmap_pars_fragment:jv,lightmap_pars_fragment:ty,lights_lambert_fragment:ey,lights_lambert_pars_fragment:ny,lights_pars_begin:iy,lights_toon_fragment:ry,lights_toon_pars_fragment:oy,lights_phong_fragment:ay,lights_phong_pars_fragment:ly,lights_physical_fragment:cy,lights_physical_pars_fragment:hy,lights_fragment_begin:uy,lights_fragment_maps:dy,lights_fragment_end:fy,lightprobes_pars_fragment:py,logdepthbuf_fragment:my,logdepthbuf_pars_fragment:gy,logdepthbuf_pars_vertex:_y,logdepthbuf_vertex:xy,map_fragment:vy,map_pars_fragment:yy,map_particle_fragment:Sy,map_particle_pars_fragment:My,metalnessmap_fragment:by,metalnessmap_pars_fragment:wy,morphinstance_vertex:Ty,morphcolor_vertex:Ey,morphnormal_vertex:Ay,morphtarget_pars_vertex:Ry,morphtarget_vertex:Cy,normal_fragment_begin:Py,normal_fragment_maps:Iy,normal_pars_fragment:Ly,normal_pars_vertex:Dy,normal_vertex:Ny,normalmap_pars_fragment:Uy,clearcoat_normal_fragment_begin:Oy,clearcoat_normal_fragment_maps:Fy,clearcoat_pars_fragment:By,iridescence_pars_fragment:zy,opaque_fragment:ky,packing:Gy,premultiplied_alpha_fragment:Hy,project_vertex:Vy,dithering_fragment:Wy,dithering_pars_fragment:Xy,roughnessmap_fragment:qy,roughnessmap_pars_fragment:Yy,shadowmap_pars_fragment:Zy,shadowmap_pars_vertex:$y,shadowmap_vertex:Jy,shadowmask_pars_fragment:Ky,skinbase_vertex:Qy,skinning_pars_vertex:jy,skinning_vertex:tS,skinnormal_vertex:eS,specularmap_fragment:nS,specularmap_pars_fragment:iS,tonemapping_fragment:sS,tonemapping_pars_fragment:rS,transmission_fragment:oS,transmission_pars_fragment:aS,uv_pars_fragment:lS,uv_pars_vertex:cS,uv_vertex:hS,worldpos_vertex:uS,background_vert:dS,background_frag:fS,backgroundCube_vert:pS,backgroundCube_frag:mS,cube_vert:gS,cube_frag:_S,depth_vert:xS,depth_frag:vS,distance_vert:yS,distance_frag:SS,equirect_vert:MS,equirect_frag:bS,linedashed_vert:wS,linedashed_frag:TS,meshbasic_vert:ES,meshbasic_frag:AS,meshlambert_vert:RS,meshlambert_frag:CS,meshmatcap_vert:PS,meshmatcap_frag:IS,meshnormal_vert:LS,meshnormal_frag:DS,meshphong_vert:NS,meshphong_frag:US,meshphysical_vert:OS,meshphysical_frag:FS,meshtoon_vert:BS,meshtoon_frag:zS,points_vert:kS,points_frag:GS,shadow_vert:HS,shadow_frag:VS,sprite_vert:WS,sprite_frag:XS},Et={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},ls={basic:{uniforms:Dn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Dn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Xt(0)},envMapIntensity:{value:1}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Dn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Dn([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Dn([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Dn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Dn([Et.points,Et.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Dn([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Dn([Et.common,Et.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Dn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Dn([Et.sprite,Et.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distance:{uniforms:Dn([Et.common,Et.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distance_vert,fragmentShader:Jt.distance_frag},shadow:{uniforms:Dn([Et.lights,Et.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};ls.physical={uniforms:Dn([ls.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var kh={r:0,b:0,g:0},qS=new ge,Tg=new qt;Tg.set(-1,0,0,0,1,0,0,0,1);function YS(s,t,e,n,i,r){let o=new Xt(0),a=i===!0?0:1,l,c,h=null,f=0,u=null;function d(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){let y=v.backgroundBlurriness>0;E=t.get(E,y)}return E}function p(v){let E=!1,y=d(v);y===null?m(o,a):y&&y.isColor&&(m(y,1),E=!0);let M=s.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(v,E){let y=d(E);y&&y.isCubeTexture?(c===void 0&&(c=new Ie(new qi(1,1,1),new Li({name:"BackgroundCubeMaterial",uniforms:zr(ls.backgroundCube.uniforms),vertexShader:ls.backgroundCube.vertexShader,fragmentShader:ls.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,b,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(qS.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Tg),c.material.toneMapped=le.getTransfer(y.colorSpace)!==ye,(h!==y||f!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Ie(new js(2,2),new Li({name:"BackgroundMaterial",uniforms:zr(ls.background.uniforms),vertexShader:ls.background.vertexShader,fragmentShader:ls.background.fragmentShader,side:ir,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=le.getTransfer(y.colorSpace)!==ye,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,E){v.getRGB(kh,qd(s)),e.buffers.color.setClear(kh.r,kh.g,kh.b,E,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,E=1){o.set(v),a=E,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,m(o,a)},render:p,addToRenderList:_,dispose:g}}function ZS(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(D,I,F,L,B){let G=!1,O=f(D,L,F,I);r!==O&&(r=O,c(r.object)),G=d(D,L,F,B),G&&p(D,L,F,B),B!==null&&t.update(B,s.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,y(D,I,F,L),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return s.createVertexArray()}function c(D){return s.bindVertexArray(D)}function h(D){return s.deleteVertexArray(D)}function f(D,I,F,L){let B=L.wireframe===!0,G=n[I.id];G===void 0&&(G={},n[I.id]=G);let O=D.isInstancedMesh===!0?D.id:0,$=G[O];$===void 0&&($={},G[O]=$);let V=$[F.id];V===void 0&&(V={},$[F.id]=V);let C=V[B];return C===void 0&&(C=u(l()),V[B]=C),C}function u(D){let I=[],F=[],L=[];for(let B=0;B<e;B++)I[B]=0,F[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:L,object:D,attributes:{},index:null}}function d(D,I,F,L){let B=r.attributes,G=I.attributes,O=0,$=F.getAttributes();for(let V in $)if($[V].location>=0){let K=B[V],gt=G[V];if(gt===void 0&&(V==="instanceMatrix"&&D.instanceMatrix&&(gt=D.instanceMatrix),V==="instanceColor"&&D.instanceColor&&(gt=D.instanceColor)),K===void 0||K.attribute!==gt||gt&&K.data!==gt.data)return!0;O++}return r.attributesNum!==O||r.index!==L}function p(D,I,F,L){let B={},G=I.attributes,O=0,$=F.getAttributes();for(let V in $)if($[V].location>=0){let K=G[V];K===void 0&&(V==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),V==="instanceColor"&&D.instanceColor&&(K=D.instanceColor));let gt={};gt.attribute=K,K&&K.data&&(gt.data=K.data),B[V]=gt,O++}r.attributes=B,r.attributesNum=O,r.index=L}function _(){let D=r.newAttributes;for(let I=0,F=D.length;I<F;I++)D[I]=0}function m(D){g(D,0)}function g(D,I){let F=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;F[D]=1,L[D]===0&&(s.enableVertexAttribArray(D),L[D]=1),B[D]!==I&&(s.vertexAttribDivisor(D,I),B[D]=I)}function v(){let D=r.newAttributes,I=r.enabledAttributes;for(let F=0,L=I.length;F<L;F++)I[F]!==D[F]&&(s.disableVertexAttribArray(F),I[F]=0)}function E(D,I,F,L,B,G,O){O===!0?s.vertexAttribIPointer(D,I,F,B,G):s.vertexAttribPointer(D,I,F,L,B,G)}function y(D,I,F,L){_();let B=L.attributes,G=F.getAttributes(),O=I.defaultAttributeValues;for(let $ in G){let V=G[$];if(V.location>=0){let C=B[$];if(C===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(C=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(C=D.instanceColor)),C!==void 0){let K=C.normalized,gt=C.itemSize,j=t.get(C);if(j===void 0)continue;let z=j.buffer,it=j.type,ut=j.bytesPerElement,bt=it===s.INT||it===s.UNSIGNED_INT||C.gpuType===nh;if(C.isInterleavedBufferAttribute){let lt=C.data,Ct=lt.isInterleavedBuffer===!0?lt.stride:lt.itemSize,re=C.offset;if(lt.isInstancedInterleavedBuffer||lt.isInstancedBufferAttribute){for(let Pt=0;Pt<V.locationSize;Pt++)g(V.location+Pt,lt.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Pt=0;Pt<V.locationSize;Pt++)m(V.location+Pt);s.bindBuffer(s.ARRAY_BUFFER,z);for(let Pt=0;Pt<V.locationSize;Pt++)E(V.location+Pt,gt/V.locationSize,it,K,Ct*ut,(re+gt/V.locationSize*Pt)*ut,bt)}else{if(C.isInstancedBufferAttribute){for(let lt=0;lt<V.locationSize;lt++)g(V.location+lt,C.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let lt=0;lt<V.locationSize;lt++)m(V.location+lt);s.bindBuffer(s.ARRAY_BUFFER,z);for(let lt=0;lt<V.locationSize;lt++)E(V.location+lt,gt/V.locationSize,it,K,gt*ut,gt/V.locationSize*lt*ut,bt)}}else if(O!==void 0){let K=O[$];if(K!==void 0)switch(K.length){case 2:s.vertexAttrib2fv(V.location,K);break;case 3:s.vertexAttrib3fv(V.location,K);break;case 4:s.vertexAttrib4fv(V.location,K);break;default:s.vertexAttrib1fv(V.location,K)}}}}v()}function M(){R();for(let D in n){let I=n[D];for(let F in I){let L=I[F];for(let B in L){let G=L[B];for(let O in G)h(G[O].object),delete G[O];delete L[B]}}delete n[D]}}function b(D){if(n[D.id]===void 0)return;let I=n[D.id];for(let F in I){let L=I[F];for(let B in L){let G=L[B];for(let O in G)h(G[O].object),delete G[O];delete L[B]}}delete n[D.id]}function x(D){for(let I in n){let F=n[I];for(let L in F){let B=F[L];if(B[D.id]===void 0)continue;let G=B[D.id];for(let O in G)h(G[O].object),delete G[O];delete B[D.id]}}}function S(D){for(let I in n){let F=n[I],L=D.isInstancedMesh===!0?D.id:0,B=F[L];if(B!==void 0){for(let G in B){let O=B[G];for(let $ in O)h(O[$].object),delete O[$];delete B[G]}delete F[L],Object.keys(F).length===0&&delete n[I]}}}function R(){A(),o=!0,r!==i&&(r=i,c(r.object))}function A(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:A,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfObject:S,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function $S(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function JS(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(x){return!(x!==Ji&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let S=x===$i&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==jn&&x!==Di&&!S&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Gt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&Gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&Gt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),M=s.getParameter(s.MAX_SAMPLES),b=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:y,maxSamples:M,samples:b}}function KS(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Xi,a=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let p=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,g=s.get(f);if(!i||p===null||p.length===0||r&&!m)r?h(null):c();else{let v=r?0:n,E=v*4,y=g.clippingState||null;l.value=y,y=h(p,u,E,d);for(let M=0;M!==E;++M)y[M]=e[M];g.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,p){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=l.value,p!==!0||m===null){let g=d+_*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let E=0,y=d;E!==_;++E,y+=4)o.copy(f[E]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var ll=class extends di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new za(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new qi(5,5,5),r=new Li({name:"CubemapFromEquirect",uniforms:zr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:Ur});r.uniforms.tEquirect.value=e;let o=new Ie(i,r),a=e.minFilter;return e.minFilter===Yi&&(e.minFilter=Hn),new ko(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},ig=256,QS=3,jS=20,Eg=256,Ag=16,tM=3,eM=new W,nM=new Xt,Yo=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ko(1,10,null),this._boxMesh=new Ie(new qi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=eM}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,u=l.autoClearColor,d=l.autoClearDepth,p=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(nM));let m=new ko(n,i,h);return m.position.copy(a),m.update(l,t),l.autoClear=f,l.autoClearColor=u,l.autoClearDepth=d,l.autoClearStencil=p,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=og(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(ig,Vd(t))}_fromTexture(t,e){t.mapping===Fr||t.mapping===Vo?this._setSize(t.image.length===0?ig:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=sg(t,!1,!1),n=Math.log2(t)-QS;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=sg(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Fr||t.mapping===Vo?(this._cubemapMaterial===null&&(this._cubemapMaterial=og()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=rg()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=iM(),this._integrationMaterial=sM());let e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Ag);for(let o=0;o<=n;o++){let a=s.lodToRoughness(o,n);if(o>n-tM)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let l=a>0?Math.log2(e)+.5*Math.log2(6/(Eg*Math.pow(a,4)))+.5:0;i.roughness.value=a,i.lodBias.value=l,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=rM());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}};function sg(s,t,e){return new ll(s,{minFilter:Yi,generateMipmaps:t,type:$i,colorSpace:Pa,depthBuffer:e})}function cl(s,t,e){return new Li({name:s,uniforms:t,vertexShader:Jt.cube_vert,fragmentShader:e,side:Mn,blending:Ur,depthTest:!1,depthWrite:!1})}function iM(){return cl("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Eg}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function sM(){return cl("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Ag}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function rM(){return cl("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${jS}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function rg(){return cl("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function og(){return cl("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function oM(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?o(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===jc||d===th)if(t.has(u)){let p=t.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new ll(p.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let d=u.mapping,p=d===jc||d===th,_=d===Fr||d===Vo;if(p||_){let m=e.get(u),g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new Yo(s)),m=p?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let v=u.image;return p&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new Yo(s)),m=p?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,d){return d===jc?u.mapping=Fr:d===th&&(u.mapping=Vo),u}function l(u){let d=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&d++;return d===p}function c(u){let d=u.target;d.removeEventListener("dispose",c);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function aM(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Lr("WebGLRenderer: "+n+" extension not supported."),i}}}function lM(s,t,e,n){let i={},r=new WeakMap,o=new FinalizationRegistry(p=>delete i[p]);function a(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",a),delete i[p.id],o.unregister(p);let _=r.get(p);_&&(t.remove(_),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,_){return i[_.id]!==void 0||(_.addEventListener("dispose",a),i[_.id]=new WeakRef(_),o.register(_,_.id,_),e.memory.geometries++),_}function h(p){let _=p.attributes;for(let m in _)t.update(_[m],s.ARRAY_BUFFER)}function f(p){let _=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let v=_!==null?_.array.length:m.array.length/3-1,E=m.count>=65535?Fa:Oa,y=new E(Math.ceil(v/3)*6,1),M=y.array;if(_!==null){let x=_.array;g=_.version;for(let S=0,R=0;S<v;S+=3){let A=x[S+0],D=x[S+1],I=x[S+2];M[R++]=A,M[R++]=D,M[R++]=D,M[R++]=I,M[R++]=I,M[R++]=A}}else{g=m.version;for(let x=0,S=0;x<v;x+=3){let R=x+0,A=x+1,D=x+2;M[S++]=R,M[S++]=A,M[S++]=A,M[S++]=D,M[S++]=D,M[S++]=R}}y.version=g;let b=r.get(p);b&&t.remove(b),r.set(p,y)}function u(p){let _=r.get(p);if(_){let m=p.index;m!==null&&_.version<m.version&&f(p)}else f(p);return r.get(p)}function d(){for(let p in i){let _=i[p].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:u,dispose:d}}function cM(s,t,e){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,u){s.drawElements(n,u,r,f*o),e.update(u,n,1)}function c(f,u,d){d!==0&&(s.drawElementsInstanced(n,u,r,f*o,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let _=0;for(let m=0;m<d;m++)_+=u[m];e.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function hM(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:Vt("WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function uM(s,t,e){let n=new WeakMap,i=new Ne;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==f){let R=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],E=0;d===!0&&(E=1),p===!0&&(E=2),_===!0&&(E=3);let y=a.attributes.position.count*E,M=1;y>t.maxTextureSize&&(M=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let b=new Float32Array(y*M*4*f),x=new Da(b,y,M,f);x.type=Di,x.needsUpdate=!0;let S=E*4;for(let A=0;A<f;A++){let D=m[A],I=g[A],F=v[A],L=y*M*4*A;for(let B=0;B<D.count;B++){let G=B*S;d===!0&&(i.fromBufferAttribute(D,B),b[L+G+0]=i.x,b[L+G+1]=i.y,b[L+G+2]=i.z,b[L+G+3]=0),p===!0&&(i.fromBufferAttribute(I,B),b[L+G+4]=i.x,b[L+G+5]=i.y,b[L+G+6]=i.z,b[L+G+7]=0),_===!0&&(i.fromBufferAttribute(F,B),b[L+G+8]=i.x,b[L+G+9]=i.y,b[L+G+10]=i.z,b[L+G+11]=F.itemSize===4?i.w:1)}}u={count:f,texture:x,size:new ne(y,M)},n.set(a,u),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let p=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function dM(s,t,e,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var fM={[wd]:"LINEAR_TONE_MAPPING",[Td]:"REINHARD_TONE_MAPPING",[Ed]:"CINEON_TONE_MAPPING",[Qa]:"ACES_FILMIC_TONE_MAPPING",[Rd]:"AGX_TONE_MAPPING",[Cd]:"NEUTRAL_TONE_MAPPING",[Ad]:"CUSTOM_TONE_MAPPING"};function pM(s,t,e,n,i,r){let o=new di(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new Pi;h.setAttribute("position",new ln([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ln([0,2,0,0,2,0],2));let f=new Bc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Ie(h,f),d=new $a(-1,1,1,-1,0,1),p=null,_=null,m=!1,g,v=null,E=[],y=!1;this.setSize=function(M,b){o.setSize(M,b),a!==null&&a.setSize(M,b),l!==null&&l.setSize(M,b);for(let x=0;x<E.length;x++){let S=E[x];S.setSize&&S.setSize(M,b)}},this.setEffects=function(M){E=M,y=E.length>0&&E[0].isRenderPass===!0;let b=o.width,x=o.height;E.length>0&&a===null&&(a=new di(b,x,{type:$i,depthBuffer:!1,stencilBuffer:!1}),l=new di(b,x,{type:$i,depthBuffer:!1,stencilBuffer:!1}));let S=i===!0&&E.some(R=>R.needsDepthTexture===!0);S!==(o.depthTexture!==null)&&(S===!0&&c===null&&(c=new As(b,x),r===!0&&(c.format=Rs,c.type=Br)),o.dispose(),o.depthTexture=S?c:null,o.resolveDepthBuffer=S,o.storeMultisampledDepthBuffer=S);for(let R=0;R<E.length;R++){let A=E[R];A.setSize&&A.setSize(b,x),S&&A.needsDepthTexture===!0&&A.setDepthTexture&&A.setDepthTexture(c)}},this.begin=function(M,b){if(m||M.toneMapping===rs&&E.length===0)return!1;if(v=b,b!==null){let x=b.width,S=b.height;(o.width!==x||o.height!==S)&&this.setSize(x,S)}return y===!1&&M.setRenderTarget(o),g=M.toneMapping,M.toneMapping=rs,!0},this.hasRenderPass=function(){return y},this.end=function(M,b){M.toneMapping=g,m=!0;let x=o,S=a;for(let R=0;R<E.length;R++){let A=E[R];A.enabled!==!1&&(A.render(M,S,x,b),A.needsSwap!==!1&&(x=S,S=S===a?l:a))}if(p!==M.outputColorSpace||_!==M.toneMapping){p=M.outputColorSpace,_=M.toneMapping,f.defines={},le.getTransfer(p)===ye&&(f.defines.SRGB_TRANSFER="");let R=fM[_];R&&(f.defines[R]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,M.setRenderTarget(v),M.render(u,d),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}var Rg=new Vn,Cg=new As(1,1),Pg=new Ga(1),Ig=new Da,Lg=new Dc,Dg=new za,ag=[],lg=[],cg=new Float32Array(16),hg=new Float32Array(9),ug=new Float32Array(4);function Zo(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=ag[i];if(r===void 0&&(r=new Float32Array(i),ag[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function cn(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function hn(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Vh(s,t){let e=lg[t];e===void 0&&(e=new Int32Array(t),lg[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function mM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function gM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(cn(e,t))return;s.uniform2fv(this.addr,t),hn(e,t)}}function _M(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(cn(e,t))return;s.uniform3fv(this.addr,t),hn(e,t)}}function xM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(cn(e,t))return;s.uniform4fv(this.addr,t),hn(e,t)}}function vM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(cn(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),hn(e,t)}else{if(cn(e,n))return;ug.set(n),s.uniformMatrix2fv(this.addr,!1,ug),hn(e,n)}}function yM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(cn(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),hn(e,t)}else{if(cn(e,n))return;hg.set(n),s.uniformMatrix3fv(this.addr,!1,hg),hn(e,n)}}function SM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(cn(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),hn(e,t)}else{if(cn(e,n))return;cg.set(n),s.uniformMatrix4fv(this.addr,!1,cg),hn(e,n)}}function MM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function bM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(cn(e,t))return;s.uniform2iv(this.addr,t),hn(e,t)}}function wM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(cn(e,t))return;s.uniform3iv(this.addr,t),hn(e,t)}}function TM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(cn(e,t))return;s.uniform4iv(this.addr,t),hn(e,t)}}function EM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function AM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(cn(e,t))return;s.uniform2uiv(this.addr,t),hn(e,t)}}function RM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(cn(e,t))return;s.uniform3uiv(this.addr,t),hn(e,t)}}function CM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(cn(e,t))return;s.uniform4uiv(this.addr,t),hn(e,t)}}function Wh(s){return s.version===0&&(s.compareFunction=zd,s.needsUpdate=!0),s}function PM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Wh(Cg):r=Rg,e.setTexture2D(t||r,i)}function IM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Lg,i)}function LM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Wh(Pg):r=Dg,e.setTextureCube(t||r,i)}function DM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Ig,i)}function NM(s){switch(s){case 5126:return mM;case 35664:return gM;case 35665:return _M;case 35666:return xM;case 35674:return vM;case 35675:return yM;case 35676:return SM;case 5124:case 35670:return MM;case 35667:case 35671:return bM;case 35668:case 35672:return wM;case 35669:case 35673:return TM;case 5125:return EM;case 36294:return AM;case 36295:return RM;case 36296:return CM;case 35678:case 36198:case 36298:case 36306:case 35682:return PM;case 35679:case 36299:case 36307:return IM;case 35680:case 36300:case 36308:case 36293:return LM;case 36289:case 36303:case 36311:case 36292:return DM}}function UM(s,t){s.uniform1fv(this.addr,t)}function OM(s,t){let e=Zo(t,this.size,2);s.uniform2fv(this.addr,e)}function FM(s,t){let e=Zo(t,this.size,3);s.uniform3fv(this.addr,e)}function BM(s,t){let e=Zo(t,this.size,4);s.uniform4fv(this.addr,e)}function zM(s,t){let e=Zo(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function kM(s,t){let e=Zo(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function GM(s,t){let e=Zo(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function HM(s,t){s.uniform1iv(this.addr,t)}function VM(s,t){s.uniform2iv(this.addr,t)}function WM(s,t){s.uniform3iv(this.addr,t)}function XM(s,t){s.uniform4iv(this.addr,t)}function qM(s,t){s.uniform1uiv(this.addr,t)}function YM(s,t){s.uniform2uiv(this.addr,t)}function ZM(s,t){s.uniform3uiv(this.addr,t)}function $M(s,t){s.uniform4uiv(this.addr,t)}function JM(s,t,e){let n=this.cache,i=t.length,r=Vh(e,i);cn(n,r)||(s.uniform1iv(this.addr,r),hn(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=Wh(Cg):o=Rg;for(let a=0;a!==i;++a)e.setTexture2D(t[a]||o,r[a])}function KM(s,t,e){let n=this.cache,i=t.length,r=Vh(e,i);cn(n,r)||(s.uniform1iv(this.addr,r),hn(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Lg,r[o])}function QM(s,t,e){let n=this.cache,i=t.length,r=Vh(e,i);cn(n,r)||(s.uniform1iv(this.addr,r),hn(n,r));let o;this.type===s.SAMPLER_CUBE_SHADOW?o=Wh(Pg):o=Dg;for(let a=0;a!==i;++a)e.setTextureCube(t[a]||o,r[a])}function jM(s,t,e){let n=this.cache,i=t.length,r=Vh(e,i);cn(n,r)||(s.uniform1iv(this.addr,r),hn(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Ig,r[o])}function t1(s){switch(s){case 5126:return UM;case 35664:return OM;case 35665:return FM;case 35666:return BM;case 35674:return zM;case 35675:return kM;case 35676:return GM;case 5124:case 35670:return HM;case 35667:case 35671:return VM;case 35668:case 35672:return WM;case 35669:case 35673:return XM;case 5125:return qM;case 36294:return YM;case 36295:return ZM;case 36296:return $M;case 35678:case 36198:case 36298:case 36306:case 35682:return JM;case 35679:case 36299:case 36307:return KM;case 35680:case 36300:case 36308:case 36293:return QM;case 36289:case 36303:case 36311:case 36292:return jM}}var sf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=NM(e.type)}},rf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=t1(e.type)}},of=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},ef=/(\w+)(\])?(\[|\.)?/g;function dg(s,t){s.seq.push(t),s.map[t.id]=t}function e1(s,t,e){let n=s.name,i=n.length;for(ef.lastIndex=0;;){let r=ef.exec(n),o=ef.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){dg(e,c===void 0?new sf(a,s,t):new rf(a,s,t));break}else{let f=e.map[a];f===void 0&&(f=new of(a),dg(e,f)),e=f}}}var qo=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);e1(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function fg(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var n1=37297,i1=0;function s1(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var pg=new qt;function r1(s){le._getMatrix(pg,le.workingColorSpace,s);let t=`mat3( ${pg.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(s)){case Ia:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return Gt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function mg(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+s1(s.getShaderSource(t),a)}else return r}function o1(s,t){let e=r1(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var a1={[wd]:"Linear",[Td]:"Reinhard",[Ed]:"Cineon",[Qa]:"ACESFilmic",[Rd]:"AgX",[Cd]:"Neutral",[Ad]:"Custom"};function l1(s,t){let e=a1[t];return e===void 0?(Gt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Gh=new W;function c1(){le.getLuminanceCoefficients(Gh);let s=Gh.x.toFixed(4),t=Gh.y.toFixed(4),e=Gh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h1(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function u1(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function d1(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function al(s){return s!==""}function gg(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function _g(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var f1=/^[ \t]*#include +<([\w\d./]+)>/gm;function af(s){return s.replace(f1,p1)}function p1(s,t){let e=Jt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return af(e)}var m1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xg(s){return s.replace(m1,g1)}function g1(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function vg(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var _1={[Nr]:"SHADOWMAP_TYPE_PCF",[Go]:"SHADOWMAP_TYPE_VSM"};function x1(s){return _1[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var v1={[Vo]:"ENVMAP_MODE_REFRACTION"};function y1(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":v1[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var S1={[bd]:"ENVMAP_BLENDING_MULTIPLY",[Um]:"ENVMAP_BLENDING_MIX",[Om]:"ENVMAP_BLENDING_ADD"};function M1(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":S1[s.combine]||"ENVMAP_BLENDING_NONE"}function b1(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=x1(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=y1(e),f=M1(e),u=h1(e),d=u1(r),p=i.createProgram(),_,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(al).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(al).join(`
`),m.length>0&&(m+=`
`)):(_=[vg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),m=[vg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==rs?"#define TONE_MAPPING":"",e.toneMapping!==rs?Jt.tonemapping_pars_fragment:"",e.toneMapping!==rs?l1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,o1("linearToOutputTexel",e.outputColorSpace),c1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(al).join(`
`)),o=af(o),o=gg(o,e),o=_g(o,e),a=af(a),a=gg(a,e),a=_g(a,e),o=xg(o),a=xg(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",e.glslVersion===kd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=g+_+o,E=g+m+a,y=fg(i,i.VERTEX_SHADER,v),M=fg(i,i.FRAGMENT_SHADER,E);i.attachShader(p,y),i.attachShader(p,M),e.index0AttributeName!==void 0?i.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function b(A){if(s.debug.checkShaderErrors){let D=i.getProgramInfoLog(p)||"",I=i.getShaderInfoLog(y)||"",F=i.getShaderInfoLog(M)||"",L=D.trim(),B=I.trim(),G=F.trim(),O=!0,$=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(O=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,y,M);else{let V=mg(i,y,"vertex"),C=mg(i,M,"fragment");Vt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+L+`
`+V+`
`+C)}else L!==""?Gt("WebGLProgram: Program Info Log:",L):(B===""||G==="")&&($=!1);$&&(A.diagnostics={runnable:O,programLog:L,vertexShader:{log:B,prefix:_},fragmentShader:{log:G,prefix:m}})}i.deleteShader(y),i.deleteShader(M),x=new qo(i,p),S=d1(i,p)}let x;this.getUniforms=function(){return x===void 0&&b(this),x};let S;this.getAttributes=function(){return S===void 0&&b(this),S};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=i.getProgramParameter(p,n1)),R},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=i1++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=y,this.fragmentShader=M,this}var w1=0,lf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new cf(t),e.set(t,n)),n}},cf=class{constructor(t){this.id=w1++,this.code=t,this.usedTimes=0}};function T1(s){return s===sr||s===sl||s===rl}function E1(s,t,e,n,i,r){let o=new Na,a=new lf,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,S,R,A,D,I){let F=A.fog,L=D.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,O=t.get(x.envMap||B,G),$=u[x.type],V=n.precision;x.precision!==null&&(V=n.getMaxPrecision(x.precision),V!==x.precision&&Gt("WebGLProgram.getParameters:",x.precision,"not supported, using",V,"instead."));let C=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,K=C!==void 0?C.length:0,gt=0;L.morphAttributes.position!==void 0&&(gt=1),L.morphAttributes.normal!==void 0&&(gt=2),L.morphAttributes.color!==void 0&&(gt=3);let j,z,it,ut;if($){let rt=ls[$];j=rt.vertexShader,z=rt.fragmentShader}else{j=x.vertexShader,z=x.fragmentShader;let rt=a.getVertexShaderStage(x),At=a.getFragmentShaderStage(x);a.update(x,rt,At),it=rt.id,ut=At.id}let bt=s.getRenderTarget(),lt=s.state.buffers.depth.getReversed(),Ct=D.isInstancedMesh===!0,re=D.isBatchedMesh===!0,Pt=!!x.map,Ht=!!x.matcap,It=!!O,Ot=It&&O.isPMREMTexture===!0,pe=!!x.aoMap,ue=!!x.lightMap,Q=!!x.bumpMap&&x.wireframe===!1,ie=!!x.normalMap,Je=!!x.displacementMap,we=!!x.emissiveMap,ce=!!x.metalnessMap,He=!!x.roughnessMap,Ze=x.anisotropy>0,k=x.clearcoat>0,_e=x.diffuseRoughness>0,de=x.dispersion>0,Wt=x.retroreflectivity>0,_t=x.iridescence>0,me=x.sheen>0,Ft=x.transmission>0,kt=Ze&&!!x.anisotropyMap,P=k&&!!x.clearcoatMap,w=k&&!!x.clearcoatNormalMap,q=k&&!!x.clearcoatRoughnessMap,ct=_e&&!!x.diffuseRoughnessMap,ot=_t&&!!x.iridescenceMap,mt=_t&&!!x.iridescenceThicknessMap,St=me&&!!x.sheenColorMap,Y=me&&!!x.sheenRoughnessMap,nt=!!x.specularMap,pt=!!x.specularColorMap,N=!!x.specularIntensityMap,et=Ft&&!!x.transmissionMap,tt=Ft&&!!x.thicknessMap,xt=!!x.gradientMap,ft=!!x.alphaMap,vt=x.alphaTest>0,dt=!!x.alphaHash,yt=!!x.extensions,at=rs;x.toneMapped&&(bt===null||bt.isXRRenderTarget===!0)&&(at=s.toneMapping);let st=Ot?O.isCompressedCubeTexture?O.image[0].mipmaps:O.mipmaps:null,Mt={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:j,fragmentShader:z,defines:x.defines,customVertexShaderID:it,customFragmentShaderID:ut,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:V,batching:re,batchingColor:re&&D._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&D.instanceColor!==null,instancingMorph:Ct&&D.morphTexture!==null,outputColorSpace:bt===null?s.outputColorSpace:bt.isXRRenderTarget===!0?bt.texture.colorSpace:le.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Pt,matcap:Ht,envMap:It,envMapMode:It&&O.mapping,envMapPMREM:Ot,envMapMaxLod:Ot?st.length-1:null,envMapSize:Ot?st[0].width:null,aoMap:pe,lightMap:ue,bumpMap:Q,normalMap:ie,displacementMap:Je,emissiveMap:we,normalMapObjectSpace:ie&&x.normalMapType===zm,normalMapTangentSpace:ie&&x.normalMapType===zh,packedNormalMap:ie&&x.normalMapType===zh&&T1(x.normalMap.format),metalnessMap:ce,roughnessMap:He,anisotropy:Ze,anisotropyMap:kt,clearcoat:k,clearcoatMap:P,clearcoatNormalMap:w,clearcoatRoughnessMap:q,diffuseRoughness:_e,diffuseRoughnessMap:ct,dispersion:de,retroreflection:Wt,iridescence:_t,iridescenceMap:ot,iridescenceThicknessMap:mt,sheen:me,sheenColorMap:St,sheenRoughnessMap:Y,specularMap:nt,specularColorMap:pt,specularIntensityMap:N,transmission:Ft,transmissionMap:et,thicknessMap:tt,gradientMap:xt,opaque:x.transparent===!1&&x.blending===Ho&&x.alphaToCoverage===!1,alphaMap:ft,alphaTest:vt,alphaHash:dt,combine:x.combine,mapUv:Pt&&d(x.map.channel),aoMapUv:pe&&d(x.aoMap.channel),lightMapUv:ue&&d(x.lightMap.channel),bumpMapUv:Q&&d(x.bumpMap.channel),normalMapUv:ie&&d(x.normalMap.channel),displacementMapUv:Je&&d(x.displacementMap.channel),emissiveMapUv:we&&d(x.emissiveMap.channel),metalnessMapUv:ce&&d(x.metalnessMap.channel),roughnessMapUv:He&&d(x.roughnessMap.channel),anisotropyMapUv:kt&&d(x.anisotropyMap.channel),clearcoatMapUv:P&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:w&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ct&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:ot&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:St&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:Y&&d(x.sheenRoughnessMap.channel),specularMapUv:nt&&d(x.specularMap.channel),specularColorMapUv:pt&&d(x.specularColorMap.channel),specularIntensityMapUv:N&&d(x.specularIntensityMap.channel),transmissionMapUv:et&&d(x.transmissionMap.channel),thicknessMapUv:tt&&d(x.thicknessMap.channel),alphaMapUv:ft&&d(x.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(ie||Ze),vertexNormals:!!L.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!L.attributes.uv&&(Pt||ft),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||L.attributes.normal===void 0&&ie===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:lt,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:gt,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:I.filter(rt=>rt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:at,decodeVideoTexture:Pt&&x.map.isVideoTexture===!0&&le.getTransfer(x.map.colorSpace)===ye,decodeVideoTextureEmissive:we&&x.emissiveMap.isVideoTexture===!0&&le.getTransfer(x.emissiveMap.colorSpace)===ye,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===pi,flipSided:x.side===Mn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:yt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(yt&&x.extensions.multiDraw===!0||re)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Mt.vertexUv1s=l.has(1),Mt.vertexUv2s=l.has(2),Mt.vertexUv3s=l.has(3),l.clear(),Mt}function _(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)S.push(R),S.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(m(S,x),g(S,x),S.push(s.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function m(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapPMREM),x.push(S.envMapMaxLod),x.push(S.envMapSize),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.diffuseRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.numLightProbeGrids),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function g(x,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.retroreflection&&o.enable(24),S.diffuseRoughness&&o.enable(25),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),S.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function v(x){let S=u[x.type],R;if(S){let A=ls[S];R=tg.clone(A.uniforms)}else R=x.uniforms;return R}function E(x,S){let R=h.get(S);return R!==void 0?++R.usedTimes:(R=new b1(s,S,x,i),c.push(R),h.set(S,R)),R}function y(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function M(x){a.remove(x)}function b(){a.dispose()}return{getParameters:p,getProgramCacheKey:_,getUniforms:v,acquireProgram:E,releaseProgram:y,releaseShaderCache:M,programs:c,dispose:b}}function A1(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function R1(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function yg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Sg(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function a(u,d,p,_,m,g){let v=s[t];return v===void 0?(v={id:u.id,object:u,geometry:d,material:p,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:g},s[t]=v):(v.id=u.id,v.object=u,v.geometry=d,v.material=p,v.materialVariant=o(u),v.groupOrder=_,v.renderOrder=u.renderOrder,v.z=m,v.group=g),t++,v}function l(u,d,p,_,m,g,v){v.reversedDepth===!0&&(m=-m);let E=a(u,d,p,_,m,g);p.transmission>0?n.push(E):p.transparent===!0?i.push(E):e.push(E)}function c(u,d,p,_,m,g){let v=a(u,d,p,_,m,g);p.transmission>0?n.unshift(v):p.transparent===!0?i.unshift(v):e.unshift(v)}function h(u,d){e.length>1&&e.sort(u||R1),n.length>1&&n.sort(d||yg),i.length>1&&i.sort(d||yg)}function f(){for(let u=t,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:f,sort:h}}function C1(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new Sg,s.set(n,[o])):i>=r.length?(o=new Sg,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function P1(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new W,color:new Xt};break;case"SpotLight":e={position:new W,direction:new W,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new W,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new W,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new W,halfWidth:new W,halfHeight:new W};break}return s[t.id]=e,e}}}function I1(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var L1=0;function D1(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function N1(s){let t=new P1,e=I1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new W);let i=new W,r=new ge,o=new ge;function a(c){let h=0,f=0,u=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let d=0,p=0,_=0,m=0,g=0,v=0,E=0,y=0,M=0,b=0,x=0,S=0,R=0,A=0;c.sort(D1);for(let I=0,F=c.length;I<F;I++){let L=c[I],B=L.color,G=L.intensity,O=L.distance,$=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===sr?$=L.shadow.map.texture:$=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=B.r*G,f+=B.g*G,u+=B.b*G;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],G);A++}else if(L.isSunLight){let V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let C=L.shadow,K=e.get(L);K.shadowIntensity=C.intensity,K.shadowBias=C.bias,K.shadowNormalBias=C.normalBias,K.shadowRadius=C.radius,K.shadowMapSize.copy(C.mapSize).multiply(C.getFrameExtents()),n.sunShadow[p]=K,n.sunShadowMap[p]=$;let gt=C.getViewportCount();for(let j=0;j<gt;j++)n.sunShadowMatrix[_+j]=C.getMatrix(j),n.sunShadowCascade[_+j]=C._cascadeData[j];_+=gt,p++}n.sun[d]=V,d++}else if(L.isDirectionalLight){let V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let C=L.shadow,K=e.get(L);K.shadowIntensity=C.intensity,K.shadowBias=C.bias,K.shadowNormalBias=C.normalBias,K.shadowRadius=C.radius,K.shadowMapSize=C.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=$,n.directionalShadowMatrix[m]=L.shadow.matrix,M++}n.directional[m]=V,m++}else if(L.isSpotLight){let V=t.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(B).multiplyScalar(G),V.distance=O,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[v]=V;let C=L.shadow;if(L.map&&(n.spotLightMap[S]=L.map,S++,C.updateMatrices(L),L.castShadow&&R++),n.spotLightMatrix[v]=C.matrix,L.castShadow){let K=e.get(L);K.shadowIntensity=C.intensity,K.shadowBias=C.bias,K.shadowNormalBias=C.normalBias,K.shadowRadius=C.radius,K.shadowMapSize=C.mapSize,n.spotShadow[v]=K,n.spotShadowMap[v]=$,x++}v++}else if(L.isRectAreaLight){let V=t.get(L);V.color.copy(B).multiplyScalar(G),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[E]=V,E++}else if(L.isPointLight){let V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){let C=L.shadow,K=e.get(L);K.shadowIntensity=C.intensity,K.shadowBias=C.bias,K.shadowNormalBias=C.normalBias,K.shadowRadius=C.radius,K.shadowMapSize=C.mapSize,K.shadowCameraNear=C.camera.near,K.shadowCameraFar=C.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=L.shadow.matrix,b++}n.point[g]=V,g++}else if(L.isHemisphereLight){let V=t.get(L);V.skyColor.copy(L.color).multiplyScalar(G),V.groundColor.copy(L.groundColor).multiplyScalar(G),n.hemi[y]=V,y++}}E>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Et.LTC_FLOAT_1,n.rectAreaLTC2=Et.LTC_FLOAT_2):(n.rectAreaLTC1=Et.LTC_HALF_1,n.rectAreaLTC2=Et.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let D=n.hash;(D.sunLength!==d||D.directionalLength!==m||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==E||D.hemiLength!==y||D.numSunShadows!==p||D.numDirectionalShadows!==M||D.numPointShadows!==b||D.numSpotShadows!==x||D.numSpotMaps!==S||D.numLightProbes!==A)&&(n.sun.length=d,n.directional.length=m,n.spot.length=v,n.rectArea.length=E,n.point.length=g,n.hemi.length=y,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+S-R,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,D.sunLength=d,D.directionalLength=m,D.pointLength=g,D.spotLength=v,D.rectAreaLength=E,D.hemiLength=y,D.numSunShadows=p,D.numDirectionalShadows=M,D.numPointShadows=b,D.numSpotShadows=x,D.numSpotMaps=S,D.numLightProbes=A,n.version=L1++)}function l(c,h){let f=0,u=0,d=0,p=0,_=0,m=0,g=h.matrixWorldInverse;for(let v=0,E=c.length;v<E;v++){let y=c[v];if(y.isSunLight){let M=n.sun[f];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(g),f++}else if(y.isDirectionalLight){let M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),u++}else if(y.isSpotLight){let M=n.spot[p];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),p++}else if(y.isRectAreaLight){let M=n.rectArea[_];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){let M=n.point[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function Mg(s){let t=new N1(s),e=[],n=[],i=[];function r(f){h.camera=f,e.length=0,n.length=0,i.length=0}function o(f){f.isLightProbeGrid?i.push(f):e.push(f)}function a(f){n.push(f)}function l(){t.setup(e),i.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function c(f){t.setupView(e,f)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function U1(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new Mg(s),t.set(i,[a])):r>=o.length?(a=new Mg(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var O1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,F1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,B1=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],z1=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],bg=new ge,ol=new W,nf=new W;function k1(s,t,e){let n=new Qs,i=new ne,r=new ne,o=new Ne,a=new zc,l=new kc,c={},h=e.maxTextureSize,f={[ir]:Mn,[Mn]:ir,[pi]:pi},u=new Li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:O1,fragmentShader:F1}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let p=new Pi;p.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ie(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nr;let g=this.type;this.render=function(b,x,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===gm&&(Gt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Nr);let R=s.getRenderTarget(),A=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),I=s.state;I.setBlending(Ur),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let F=g!==this.type;F&&x.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(B=>B.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,B=b.length;L<B;L++){let G=b[L],O=G.shadow;if(O===void 0){Gt("WebGLShadowMap:",G,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);let $=O.getFrameExtents();i.multiply($),r.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/$.x),i.x=r.x*$.x,O.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/$.y),i.y=r.y*$.y,O.mapSize.y=r.y));let V=s.state.buffers.depth.getReversed();if(O.camera._reversedDepth=V,O.map===null||F===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Go){if(G.isPointLight){Gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new di(i.x,i.y,{format:sr,type:$i,minFilter:Hn,magFilter:Hn,generateMipmaps:!1}),O.map.texture.name=G.name+".shadowMap",O.map.depthTexture=new As(i.x,i.y,Di),O.map.depthTexture.name=G.name+".shadowMapDepth",O.map.depthTexture.format=Es,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=gn,O.map.depthTexture.magFilter=gn}else G.isPointLight?(O.map=new ll(i.x),O.map.depthTexture=new Ga(i.x,Zi)):(O.map=new di(i.x,i.y),O.map.depthTexture=new As(i.x,i.y,Zi)),O.map.depthTexture.name=G.name+".shadowMap",O.map.depthTexture.format=Es,this.type===Nr?(O.map.depthTexture.compareFunction=V?Bd:Fd,O.map.depthTexture.minFilter=Hn,O.map.depthTexture.magFilter=Hn):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=gn,O.map.depthTexture.magFilter=gn);O.camera.updateProjectionMatrix()}O.map.isWebGLCubeRenderTarget!==!0&&(O.map.width!==i.x||O.map.height!==i.y)&&O.map.setSize(i.x,i.y);let C=O.map.isWebGLCubeRenderTarget?6:O.getViewportCount();G.isPointLight!==!0&&O.updateMatrices(G,S);let K=(O.camera.layers.mask&4294967294)!==0?O.camera.layers:S.layers;for(let gt=0;gt<C;gt++){let j=O.getCamera(gt);if(G.isPointLight){let z=O.camera,it=O.matrix,ut=G.distance||z.far;ut!==z.far&&(z.far=ut,z.updateProjectionMatrix()),ol.setFromMatrixPosition(G.matrixWorld),z.position.copy(ol),nf.copy(z.position),nf.add(B1[gt]),z.up.copy(z1[gt]),z.lookAt(nf),z.updateMatrixWorld(),it.makeTranslation(-ol.x,-ol.y,-ol.z),bg.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),O._frustum.setFromProjectionMatrix(bg,z.coordinateSystem,z.reversedDepth)}if(O.map.isWebGLCubeRenderTarget)s.setRenderTarget(O.map,gt),s.clear();else{gt===0&&(s.setRenderTarget(O.map),s.clear());let z=O.getViewport(gt);o.set(r.x*z.x,r.y*z.y,r.x*z.z,r.y*z.w),I.viewport(o)}n=O.getFrustum(gt),y(x,S,j,G,K,this.type)}O.isPointLightShadow!==!0&&this.type===Go&&v(O,S),O.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(R,A,D)};function v(b,x){let S=t.update(_);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new di(i.x,i.y,{format:sr,type:$i}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(x,null,S,u,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(x,null,S,d,_,null)}function E(b,x,S,R){let A=null,D=S.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)A=D;else if(A=S.isPointLight===!0?l:a,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let I=A.uuid,F=x.uuid,L=c[I];L===void 0&&(L={},c[I]=L);let B=L[F];B===void 0&&(B=A.clone(),L[F]=B,x.addEventListener("dispose",M)),A=B}if(A.visible=x.visible,A.wireframe=x.wireframe,R===Go?A.side=x.shadowSide!==null?x.shadowSide:x.side:A.side=x.shadowSide!==null?x.shadowSide:f[x.side],A.alphaMap=x.alphaMap,A.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,A.map=x.map,A.clipShadows=x.clipShadows,A.clippingPlanes=x.clippingPlanes,A.clipIntersection=x.clipIntersection,A.displacementMap=x.displacementMap,A.displacementScale=x.displacementScale,A.displacementBias=x.displacementBias,A.wireframeLinewidth=x.wireframeLinewidth,A.linewidth=x.linewidth,S.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let I=s.properties.get(A);I.light=S}return A}function y(b,x,S,R,A,D){if(b.visible===!1)return;if(b.layers.test(A)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&D===Go)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,b.matrixWorld);let L=t.update(b),B=b.material;if(Array.isArray(B)){let G=L.groups;for(let O=0,$=G.length;O<$;O++){let V=G[O],C=B[V.materialIndex];if(C&&C.visible){let K=E(b,C,R,D);b.onBeforeShadow(s,b,x,S,L,K,V),s.renderBufferDirect(S,null,L,K,b,V),b.onAfterShadow(s,b,x,S,L,K,V)}}}else if(B.visible){let G=E(b,B,R,D);b.onBeforeShadow(s,b,x,S,L,G,null),s.renderBufferDirect(S,null,L,G,b,null),b.onAfterShadow(s,b,x,S,L,G,null)}}let F=b.children;for(let L=0,B=F.length;L<B;L++)y(F[L],x,S,R,A,D)}function M(b){b.target.removeEventListener("dispose",M);for(let S in c){let R=c[S],A=b.target.uuid;A in R&&(R[A].dispose(),delete R[A])}}}function G1(s,t){function e(){let N=!1,et=new Ne,tt=null,xt=new Ne(0,0,0,0);return{setMask:function(ft){tt!==ft&&!N&&(s.colorMask(ft,ft,ft,ft),tt=ft)},setLocked:function(ft){N=ft},setClear:function(ft,vt,dt,yt,at){at===!0&&(ft*=yt,vt*=yt,dt*=yt),et.set(ft,vt,dt,yt),xt.equals(et)===!1&&(s.clearColor(ft,vt,dt,yt),xt.copy(et))},reset:function(){N=!1,tt=null,xt.set(-1,0,0,0)}}}function n(){let N=!1,et=!1,tt=null,xt=null,ft=null;return{setReversed:function(vt){if(et!==vt){let dt=t.get("EXT_clip_control");vt?dt.clipControlEXT(dt.LOWER_LEFT_EXT,dt.ZERO_TO_ONE_EXT):dt.clipControlEXT(dt.LOWER_LEFT_EXT,dt.NEGATIVE_ONE_TO_ONE_EXT),et=vt;let yt=ft;ft=null,this.setClear(yt)}},getReversed:function(){return et},setTest:function(vt){vt?lt(s.DEPTH_TEST):Ct(s.DEPTH_TEST)},setMask:function(vt){tt!==vt&&!N&&(s.depthMask(vt),tt=vt)},setFunc:function(vt){if(et&&(vt=Jm[vt]),xt!==vt){switch(vt){case Mc:s.depthFunc(s.NEVER);break;case bc:s.depthFunc(s.ALWAYS);break;case wc:s.depthFunc(s.LESS);break;case Ro:s.depthFunc(s.LEQUAL);break;case Tc:s.depthFunc(s.EQUAL);break;case Ec:s.depthFunc(s.GEQUAL);break;case Ac:s.depthFunc(s.GREATER);break;case Rc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xt=vt}},setLocked:function(vt){N=vt},setClear:function(vt){ft!==vt&&(ft=vt,et&&(vt=1-vt),s.clearDepth(vt))},reset:function(){N=!1,tt=null,xt=null,ft=null,et=!1}}}function i(){let N=!1,et=null,tt=null,xt=null,ft=null,vt=null,dt=null,yt=null,at=null;return{setTest:function(st){N||(st?lt(s.STENCIL_TEST):Ct(s.STENCIL_TEST))},setMask:function(st){et!==st&&!N&&(s.stencilMask(st),et=st)},setFunc:function(st,Mt,rt){(tt!==st||xt!==Mt||ft!==rt)&&(s.stencilFunc(st,Mt,rt),tt=st,xt=Mt,ft=rt)},setOp:function(st,Mt,rt){(vt!==st||dt!==Mt||yt!==rt)&&(s.stencilOp(st,Mt,rt),vt=st,dt=Mt,yt=rt)},setLocked:function(st){N=st},setClear:function(st){at!==st&&(s.clearStencil(st),at=st)},reset:function(){N=!1,et=null,tt=null,xt=null,ft=null,vt=null,dt=null,yt=null,at=null}}}let r=new e,o=new n,a=new i,l={},c=new WeakMap,h={},f={},u={},d=new WeakMap,p=[],_=null,m=!1,g=null,v=null,E=null,y=null,M=null,b=null,x=null,S=new Xt(0,0,0),R=0,A=!1,D=null,I=null,F=null,L=null,B=null,G=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,$=0,V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(V)[1]),O=$>=1):V.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),O=$>=2);let C=null,K={},gt=s.getParameter(s.SCISSOR_BOX),j=s.getParameter(s.VIEWPORT),z=new Ne().fromArray(gt),it=new Ne().fromArray(j);function ut(N,et,tt,xt){let ft=new Uint8Array(4),vt=s.createTexture();s.bindTexture(N,vt),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let dt=0;dt<tt;dt++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(et,0,s.RGBA,1,1,xt,0,s.RGBA,s.UNSIGNED_BYTE,ft):s.texImage2D(et+dt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ft);return vt}let bt={};bt[s.TEXTURE_2D]=ut(s.TEXTURE_2D,s.TEXTURE_2D,1),bt[s.TEXTURE_CUBE_MAP]=ut(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),bt[s.TEXTURE_2D_ARRAY]=ut(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),bt[s.TEXTURE_3D]=ut(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),lt(s.DEPTH_TEST),o.setFunc(Ro),Q(!1),ie(xd),lt(s.CULL_FACE),pe(Ur);function lt(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function Ct(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function re(N,et){return u[N]!==et?(s.bindFramebuffer(N,et),u[N]=et,N===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=et),N===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=et),!0):!1}function Pt(N,et){let tt=p,xt=!1;if(N){tt=d.get(et),tt===void 0&&(tt=[],d.set(et,tt));let ft=N.textures;if(tt.length!==ft.length||tt[0]!==s.COLOR_ATTACHMENT0){for(let vt=0,dt=ft.length;vt<dt;vt++)tt[vt]=s.COLOR_ATTACHMENT0+vt;tt.length=ft.length,xt=!0}}else tt[0]!==s.BACK&&(tt[0]=s.BACK,xt=!0);xt&&s.drawBuffers(tt)}function Ht(N){return _!==N?(s.useProgram(N),_=N,!0):!1}let It={[Or]:s.FUNC_ADD,[xm]:s.FUNC_SUBTRACT,[vm]:s.FUNC_REVERSE_SUBTRACT};It[ym]=s.MIN,It[Sm]=s.MAX;let Ot={[Mm]:s.ZERO,[bm]:s.ONE,[wm]:s.SRC_COLOR,[Sd]:s.SRC_ALPHA,[Pm]:s.SRC_ALPHA_SATURATE,[Rm]:s.DST_COLOR,[Em]:s.DST_ALPHA,[Tm]:s.ONE_MINUS_SRC_COLOR,[Md]:s.ONE_MINUS_SRC_ALPHA,[Cm]:s.ONE_MINUS_DST_COLOR,[Am]:s.ONE_MINUS_DST_ALPHA,[Im]:s.CONSTANT_COLOR,[Lm]:s.ONE_MINUS_CONSTANT_COLOR,[Dm]:s.CONSTANT_ALPHA,[Nm]:s.ONE_MINUS_CONSTANT_ALPHA};function pe(N,et,tt,xt,ft,vt,dt,yt,at,st){if(N===Ur){m===!0&&(Ct(s.BLEND),m=!1);return}if(m===!1&&(lt(s.BLEND),m=!0),N!==_m){if(N!==g||st!==A){if((v!==Or||M!==Or)&&(s.blendEquation(s.FUNC_ADD),v=Or,M=Or),st)switch(N){case Ho:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ka:s.blendFunc(s.ONE,s.ONE);break;case vd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case yd:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Vt("WebGLState: Invalid blending: ",N);break}else switch(N){case Ho:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ka:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case vd:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yd:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",N);break}E=null,y=null,b=null,x=null,S.set(0,0,0),R=0,g=N,A=st}return}ft=ft||et,vt=vt||tt,dt=dt||xt,(et!==v||ft!==M)&&(s.blendEquationSeparate(It[et],It[ft]),v=et,M=ft),(tt!==E||xt!==y||vt!==b||dt!==x)&&(s.blendFuncSeparate(Ot[tt],Ot[xt],Ot[vt],Ot[dt]),E=tt,y=xt,b=vt,x=dt),(yt.equals(S)===!1||at!==R)&&(s.blendColor(yt.r,yt.g,yt.b,at),S.copy(yt),R=at),g=N,A=!1}function ue(N,et){N.side===pi?Ct(s.CULL_FACE):lt(s.CULL_FACE);let tt=N.side===Mn;et&&(tt=!tt),Q(tt),N.blending===Ho&&N.transparent===!1?pe(Ur):pe(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let xt=N.stencilWrite;a.setTest(xt),xt&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),we(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?lt(s.SAMPLE_ALPHA_TO_COVERAGE):Ct(s.SAMPLE_ALPHA_TO_COVERAGE)}function Q(N){D!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),D=N)}function ie(N){N!==pm?(lt(s.CULL_FACE),N!==I&&(N===xd?s.cullFace(s.BACK):N===mm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ct(s.CULL_FACE),I=N}function Je(N){N!==F&&(O&&s.lineWidth(N),F=N)}function we(N,et,tt){N?(lt(s.POLYGON_OFFSET_FILL),(L!==et||B!==tt)&&(L=et,B=tt,o.getReversed()&&(et=-et,tt=-tt),s.polygonOffset(et,tt))):Ct(s.POLYGON_OFFSET_FILL)}function ce(N){N?lt(s.SCISSOR_TEST):Ct(s.SCISSOR_TEST)}function He(N){N===void 0&&(N=s.TEXTURE0+G-1),C!==N&&(s.activeTexture(N),C=N)}function Ze(N,et,tt){tt===void 0&&(C===null?tt=s.TEXTURE0+G-1:tt=C);let xt=K[tt];xt===void 0&&(xt={type:void 0,texture:void 0},K[tt]=xt),(xt.type!==N||xt.texture!==et)&&(C!==tt&&(s.activeTexture(tt),C=tt),s.bindTexture(N,et||bt[N]),xt.type=N,xt.texture=et)}function k(){let N=K[C];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function _e(){try{s.compressedTexImage2D(...arguments)}catch(N){Vt("WebGLState:",N)}}function de(){try{s.compressedTexImage3D(...arguments)}catch(N){Vt("WebGLState:",N)}}function Wt(){try{s.texSubImage2D(...arguments)}catch(N){Vt("WebGLState:",N)}}function _t(){try{s.texSubImage3D(...arguments)}catch(N){Vt("WebGLState:",N)}}function me(){try{s.compressedTexSubImage2D(...arguments)}catch(N){Vt("WebGLState:",N)}}function Ft(){try{s.compressedTexSubImage3D(...arguments)}catch(N){Vt("WebGLState:",N)}}function kt(){try{s.texStorage2D(...arguments)}catch(N){Vt("WebGLState:",N)}}function P(){try{s.texStorage3D(...arguments)}catch(N){Vt("WebGLState:",N)}}function w(){try{s.texImage2D(...arguments)}catch(N){Vt("WebGLState:",N)}}function q(){try{s.texImage3D(...arguments)}catch(N){Vt("WebGLState:",N)}}function ct(N){return f[N]!==void 0?f[N]:s.getParameter(N)}function ot(N,et){f[N]!==et&&(s.pixelStorei(N,et),f[N]=et)}function mt(N){z.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),z.copy(N))}function St(N){it.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),it.copy(N))}function Y(N,et){let tt=c.get(et);tt===void 0&&(tt=new WeakMap,c.set(et,tt));let xt=tt.get(N);xt===void 0&&(xt=s.getUniformBlockIndex(et,N.name),s.uniformBlockBinding(et,xt,xt),tt.set(N,xt))}function nt(N,et,tt){let ft=c.get(et).get(N);l[ft]!==tt&&(s.bindBufferBase(s.UNIFORM_BUFFER,ft,tt),l[ft]=tt)}function pt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},C=null,K={},u={},l={},d=new WeakMap,p=[],_=null,m=!1,g=null,v=null,E=null,y=null,M=null,b=null,x=null,S=new Xt(0,0,0),R=0,A=!1,D=null,I=null,F=null,L=null,B=null,z.set(0,0,s.canvas.width,s.canvas.height),it.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:lt,disable:Ct,bindFramebuffer:re,drawBuffers:Pt,useProgram:Ht,setBlending:pe,setMaterial:ue,setFlipSided:Q,setCullFace:ie,setLineWidth:Je,setPolygonOffset:we,setScissorTest:ce,activeTexture:He,bindTexture:Ze,unbindTexture:k,compressedTexImage2D:_e,compressedTexImage3D:de,texImage2D:w,texImage3D:q,pixelStorei:ot,getParameter:ct,updateUBOMapping:Y,uniformBlockBinding:nt,texStorage2D:kt,texStorage3D:P,texSubImage2D:Wt,texSubImage3D:_t,compressedTexSubImage2D:me,compressedTexSubImage3D:Ft,scissor:mt,viewport:St,reset:pt}}function H1(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,h=new WeakMap,f=new Set,u,d=new WeakMap,p=new Set,_=new FinalizationRegistry(P=>p.delete(P)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,w){return m?new OffscreenCanvas(P,w):La("canvas")}function v(P,w,q){let ct=1,ot=kt(P);if((ot.width>q||ot.height>q)&&(ct=q/Math.max(ot.width,ot.height)),ct<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let mt=Math.floor(ct*ot.width),St=Math.floor(ct*ot.height);u===void 0&&(u=g(mt,St));let Y=w?g(mt,St):u;return Y.width=mt,Y.height=St,Y.getContext("2d").drawImage(P,0,0,mt,St),Gt("WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+mt+"x"+St+")."),Y}else return"data"in P&&Gt("WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),P;return P}function E(P){return P.generateMipmaps}function y(P){s.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(P,w,q,ct,ot,mt=!1){if(P!==null){if(s[P]!==void 0)return s[P];Gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let St;ct&&(St=t.get("EXT_texture_norm16"),St||Gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=w;if(w===s.RED&&(q===s.FLOAT&&(Y=s.R32F),q===s.HALF_FLOAT&&(Y=s.R16F),q===s.UNSIGNED_BYTE&&(Y=s.R8),q===s.UNSIGNED_SHORT&&St&&(Y=St.R16_EXT),q===s.SHORT&&St&&(Y=St.R16_SNORM_EXT)),w===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(Y=s.R8UI),q===s.UNSIGNED_SHORT&&(Y=s.R16UI),q===s.UNSIGNED_INT&&(Y=s.R32UI),q===s.BYTE&&(Y=s.R8I),q===s.SHORT&&(Y=s.R16I),q===s.INT&&(Y=s.R32I)),w===s.RG&&(q===s.FLOAT&&(Y=s.RG32F),q===s.HALF_FLOAT&&(Y=s.RG16F),q===s.UNSIGNED_BYTE&&(Y=s.RG8),q===s.UNSIGNED_SHORT&&St&&(Y=St.RG16_EXT),q===s.SHORT&&St&&(Y=St.RG16_SNORM_EXT)),w===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(Y=s.RG8UI),q===s.UNSIGNED_SHORT&&(Y=s.RG16UI),q===s.UNSIGNED_INT&&(Y=s.RG32UI),q===s.BYTE&&(Y=s.RG8I),q===s.SHORT&&(Y=s.RG16I),q===s.INT&&(Y=s.RG32I)),w===s.RGB_INTEGER&&(q===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),q===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),q===s.UNSIGNED_INT&&(Y=s.RGB32UI),q===s.BYTE&&(Y=s.RGB8I),q===s.SHORT&&(Y=s.RGB16I),q===s.INT&&(Y=s.RGB32I)),w===s.RGBA_INTEGER&&(q===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),q===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),q===s.UNSIGNED_INT&&(Y=s.RGBA32UI),q===s.BYTE&&(Y=s.RGBA8I),q===s.SHORT&&(Y=s.RGBA16I),q===s.INT&&(Y=s.RGBA32I)),w===s.RGB&&(q===s.UNSIGNED_SHORT&&St&&(Y=St.RGB16_EXT),q===s.SHORT&&St&&(Y=St.RGB16_SNORM_EXT),q===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),q===s.UNSIGNED_INT_10F_11F_11F_REV&&(Y=s.R11F_G11F_B10F)),w===s.RGBA){let nt=mt?Ia:le.getTransfer(ot);q===s.FLOAT&&(Y=s.RGBA32F),q===s.HALF_FLOAT&&(Y=s.RGBA16F),q===s.UNSIGNED_BYTE&&(Y=nt===ye?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT&&St&&(Y=St.RGBA16_EXT),q===s.SHORT&&St&&(Y=St.RGBA16_SNORM_EXT),q===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function x(P,w){let q;return P?w===null||w===Zi||w===Br?q=s.DEPTH24_STENCIL8:w===Di?q=s.DEPTH32F_STENCIL8:w===Wo&&(q=s.DEPTH24_STENCIL8,Gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Zi||w===Br?q=s.DEPTH_COMPONENT24:w===Di?q=s.DEPTH_COMPONENT32F:w===Wo&&(q=s.DEPTH_COMPONENT16),q}function S(P,w){return E(P)===!0||P.isFramebufferTexture&&P.minFilter!==gn&&P.minFilter!==Hn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function R(P){let w=new WeakRef(P);n.get(P).__ref=w,p.add(w),_.register(P,w,w)}function A(P){let w=n.get(P).__ref;w!==void 0&&(p.delete(w),_.unregister(w))}function D(P){F(P.target)}function I(P){L(P.target)}function F(P){P.removeEventListener("dispose",D),A(P),G(P),P.isVideoTexture&&h.delete(P),P.isHTMLTexture&&f.delete(P)}function L(P){P.removeEventListener("dispose",I),A(P),$(P)}function B(){for(let P of p){let w=P.deref();w!==void 0&&(w.isRenderTarget===!0?L(w):F(w))}p.clear(),f.clear()}function G(P){let w=n.get(P);if(w.__webglInit===void 0)return;let q=P.source,ct=d.get(q);if(ct){let ot=ct[w.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&O(P),Object.keys(ct).length===0&&d.delete(q)}n.remove(P)}function O(P){let w=n.get(P);s.deleteTexture(w.__webglTexture);let q=P.source,ct=d.get(q);delete ct[w.__cacheKey],o.memory.textures--}function $(P){let w=n.get(P);w.__depthDisposeCallback&&w.__depthDisposeCallback();let q=P.depthTexture;if(q&&q.renderTarget===P&&F(q),P.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(w.__webglFramebuffer[ot]))for(let mt=0;mt<w.__webglFramebuffer[ot].length;mt++)s.deleteFramebuffer(w.__webglFramebuffer[ot][mt]);else s.deleteFramebuffer(w.__webglFramebuffer[ot]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[ot])}else{if(Array.isArray(w.__webglFramebuffer))for(let ot=0;ot<w.__webglFramebuffer.length;ot++)s.deleteFramebuffer(w.__webglFramebuffer[ot]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ot=0;ot<w.__webglColorRenderbuffer.length;ot++)w.__webglColorRenderbuffer[ot]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[ot]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let ct=P.textures;for(let ot=0,mt=ct.length;ot<mt;ot++){let St=n.get(ct[ot]);St.__webglTexture&&(s.deleteTexture(St.__webglTexture),o.memory.textures--),n.remove(ct[ot])}n.remove(P)}let V=0;function C(){V=0}function K(){return V}function gt(P){V=P}function j(){let P=V;return P>=i.maxTextures&&Gt("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+i.maxTextures),V+=1,P}function z(P){let w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.mipmapsAutoUpdate),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function it(P,w){let q=n.get(P);if(P.isVideoTexture&&me(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&q.__version!==P.version){let ct=P.image;if(ct===null)Gt("WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)Gt("WebGLRenderer: Texture marked for update but image is incomplete");else{ue(q,P,w);return}}else P.isExternalTexture&&(q.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+w)}function ut(P,w){let q=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){ue(q,P,w);return}else P.isExternalTexture&&(q.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+w)}function bt(P,w){let q=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){ue(q,P,w);return}e.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+w)}function lt(P,w){let q=n.get(P);if(P.version>0&&q.__version!==P.version){Q(q,P,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+w)}let Ct={[Co]:s.REPEAT,[ns]:s.CLAMP_TO_EDGE,[Cc]:s.MIRRORED_REPEAT},re={[gn]:s.NEAREST,[Fm]:s.NEAREST_MIPMAP_NEAREST,[ja]:s.NEAREST_MIPMAP_LINEAR,[Hn]:s.LINEAR,[eh]:s.LINEAR_MIPMAP_NEAREST,[Yi]:s.LINEAR_MIPMAP_LINEAR},Pt={[Gm]:s.NEVER,[zd]:s.ALWAYS,[Hm]:s.LESS,[Fd]:s.LEQUAL,[Vm]:s.EQUAL,[Bd]:s.GEQUAL,[Wm]:s.GREATER,[Xm]:s.NOTEQUAL};function Ht(P,w){if(w.type===Di&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Hn||w.magFilter===eh||w.magFilter===ja||w.magFilter===Yi||w.minFilter===Hn||w.minFilter===eh||w.minFilter===ja||w.minFilter===Yi)&&Gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,Ct[w.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,Ct[w.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,Ct[w.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,re[w.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,re[w.minFilter]),w.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,Pt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===gn||w.minFilter!==ja&&w.minFilter!==Yi||w.type===Di&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function It(P,w){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",D),R(w));let ct=w.source,ot=d.get(ct);ot===void 0&&(ot={},d.set(ct,ot));let mt=z(w);if(mt!==P.__cacheKey){ot[mt]===void 0&&(ot[mt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ot[mt].usedTimes++;let St=ot[P.__cacheKey];St!==void 0&&(ot[P.__cacheKey].usedTimes--,St.usedTimes===0&&O(w)),P.__cacheKey=mt,P.__webglTexture=ot[mt].texture}return q}function Ot(P,w,q){return Math.floor(Math.floor(P/q)/w)}function pe(P,w,q,ct){let mt=P.updateRanges;if(mt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,q,ct,w.data);else{mt.sort((N,et)=>N.start-et.start);let St=0;for(let N=1;N<mt.length;N++){let et=mt[St],tt=mt[N],xt=et.start+et.count,ft=Ot(tt.start,w.width,4),vt=Ot(et.start,w.width,4);tt.start<=xt+1&&ft===vt&&Ot(tt.start+tt.count-1,w.width,4)===ft?et.count=Math.max(et.count,tt.start+tt.count-et.start):(++St,mt[St]=tt)}mt.length=St+1;let Y=e.getParameter(s.UNPACK_ROW_LENGTH),nt=e.getParameter(s.UNPACK_SKIP_PIXELS),pt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let N=0,et=mt.length;N<et;N++){let tt=mt[N],xt=Math.floor(tt.start/4),ft=Math.ceil(tt.count/4),vt=xt%w.width,dt=Math.floor(xt/w.width),yt=ft,at=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,vt),e.pixelStorei(s.UNPACK_SKIP_ROWS,dt),e.texSubImage2D(s.TEXTURE_2D,0,vt,dt,yt,at,q,ct,w.data)}P.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Y),e.pixelStorei(s.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(s.UNPACK_SKIP_ROWS,pt)}}function ue(P,w,q){let ct=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ct=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ct=s.TEXTURE_3D);let ot=It(P,w),mt=w.source;e.bindTexture(ct,P.__webglTexture,s.TEXTURE0+q);let St=n.get(mt);if(mt.version!==St.__version||ot===!0){if(e.activeTexture(s.TEXTURE0+q),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let at=le.getPrimaries(le.workingColorSpace),st=w.colorSpace===Cs?null:le.getPrimaries(w.colorSpace),Mt=w.colorSpace===Cs||at===st?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt)}e.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment);let nt=v(w.image,!1,i.maxTextureSize);nt=Ft(w,nt);let pt=r.convert(w.format,w.colorSpace),N=r.convert(w.type),et=b(w.internalFormat,pt,N,w.normalized,w.colorSpace,w.isVideoTexture);Ht(ct,w);let tt,xt=w.mipmaps,ft=w.isVideoTexture!==!0,vt=St.__version===void 0||ot===!0,dt=mt.dataReady,yt=S(w,nt);if(w.isDepthTexture)et=x(w.format===Rs,w.type),vt&&(ft?e.texStorage2D(s.TEXTURE_2D,1,et,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,et,nt.width,nt.height,0,pt,N,null));else if(w.isDataTexture)if(xt.length>0){ft&&vt&&e.texStorage2D(s.TEXTURE_2D,yt,et,xt[0].width,xt[0].height);for(let at=0,st=xt.length;at<st;at++)tt=xt[at],ft?dt&&e.texSubImage2D(s.TEXTURE_2D,at,0,0,tt.width,tt.height,pt,N,tt.data):e.texImage2D(s.TEXTURE_2D,at,et,tt.width,tt.height,0,pt,N,tt.data);w.generateMipmaps=!1}else ft?(vt&&e.texStorage2D(s.TEXTURE_2D,yt,et,nt.width,nt.height),dt&&pe(w,nt,pt,N)):e.texImage2D(s.TEXTURE_2D,0,et,nt.width,nt.height,0,pt,N,nt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ft&&vt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,yt,et,xt[0].width,xt[0].height,nt.depth);for(let at=0,st=xt.length;at<st;at++)if(tt=xt[at],w.format!==Ji)if(pt!==null)if(ft){if(dt)if(w.layerUpdates.size>0){let Mt=$d(tt.width,tt.height,w.format,w.type);for(let rt of w.layerUpdates){let At=tt.data.subarray(rt*Mt/tt.data.BYTES_PER_ELEMENT,(rt+1)*Mt/tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,at,0,0,rt,tt.width,tt.height,1,pt,At)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,at,0,0,0,tt.width,tt.height,nt.depth,pt,tt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,at,et,tt.width,tt.height,nt.depth,0,tt.data,0,0);else Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?dt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,at,0,0,0,tt.width,tt.height,nt.depth,pt,N,tt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,at,et,tt.width,tt.height,nt.depth,0,pt,N,tt.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{ft&&vt&&e.texStorage2D(s.TEXTURE_2D,yt,et,xt[0].width,xt[0].height);for(let at=0,st=xt.length;at<st;at++)tt=xt[at],w.format!==Ji?pt!==null?ft?dt&&e.compressedTexSubImage2D(s.TEXTURE_2D,at,0,0,tt.width,tt.height,pt,tt.data):e.compressedTexImage2D(s.TEXTURE_2D,at,et,tt.width,tt.height,0,tt.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?dt&&e.texSubImage2D(s.TEXTURE_2D,at,0,0,tt.width,tt.height,pt,N,tt.data):e.texImage2D(s.TEXTURE_2D,at,et,tt.width,tt.height,0,pt,N,tt.data)}else if(w.isDataArrayTexture)if(ft){if(vt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,yt,et,nt.width,nt.height,nt.depth),dt)if(w.layerUpdates.size>0){let at=$d(nt.width,nt.height,w.format,w.type);for(let st of w.layerUpdates){let Mt=nt.data.subarray(st*at/nt.data.BYTES_PER_ELEMENT,(st+1)*at/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,st,nt.width,nt.height,1,pt,N,Mt)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,pt,N,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,et,nt.width,nt.height,nt.depth,0,pt,N,nt.data);else if(w.isData3DTexture)ft?(vt&&e.texStorage3D(s.TEXTURE_3D,yt,et,nt.width,nt.height,nt.depth),dt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,pt,N,nt.data)):e.texImage3D(s.TEXTURE_3D,0,et,nt.width,nt.height,nt.depth,0,pt,N,nt.data);else if(w.isFramebufferTexture){if(vt)if(ft)e.texStorage2D(s.TEXTURE_2D,yt,et,nt.width,nt.height);else{let at=nt.width,st=nt.height;for(let Mt=0;Mt<yt;Mt++)e.texImage2D(s.TEXTURE_2D,Mt,et,at,st,0,pt,N,null),at>>=1,st>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in s){let at=s.canvas;if(at.hasAttribute("layoutsubtree")||at.setAttribute("layoutsubtree","true"),nt.parentNode!==at){at.appendChild(nt),f.add(w),at.onpaint=st=>{let Mt=st.changedElements;for(let rt of f)Mt.includes(rt.image)&&(rt.needsUpdate=!0)},at.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,nt);else{let Mt=s.RGBA,rt=s.RGBA,At=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Mt,rt,At,nt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(xt.length>0){if(ft&&vt){let at=kt(xt[0]);e.texStorage2D(s.TEXTURE_2D,yt,et,at.width,at.height)}for(let at=0,st=xt.length;at<st;at++)tt=xt[at],ft?dt&&e.texSubImage2D(s.TEXTURE_2D,at,0,0,pt,N,tt):e.texImage2D(s.TEXTURE_2D,at,et,pt,N,tt);w.generateMipmaps=!1}else if(ft){if(vt){let at=kt(nt);e.texStorage2D(s.TEXTURE_2D,yt,et,at.width,at.height)}dt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,pt,N,nt)}else e.texImage2D(s.TEXTURE_2D,0,et,pt,N,nt);E(w)&&w.mipmapsAutoUpdate===!0&&y(ct),St.__version=mt.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Q(P,w,q){if(w.image.length!==6)return;let ct=It(P,w),ot=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+q);let mt=n.get(ot);if(ot.version!==mt.__version||ct===!0){e.activeTexture(s.TEXTURE0+q);let St=le.getPrimaries(le.workingColorSpace),Y=w.colorSpace===Cs?null:le.getPrimaries(w.colorSpace),nt=w.colorSpace===Cs||St===Y?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let pt=w.isCompressedTexture||w.image[0].isCompressedTexture,N=w.image[0]&&w.image[0].isDataTexture,et=[];for(let rt=0;rt<6;rt++)!pt&&!N?et[rt]=v(w.image[rt],!0,i.maxCubemapSize):et[rt]=N?w.image[rt].image:w.image[rt],et[rt]=Ft(w,et[rt]);let tt=et[0],xt=r.convert(w.format,w.colorSpace),ft=r.convert(w.type),vt=b(w.internalFormat,xt,ft,w.normalized,w.colorSpace),dt=w.isVideoTexture!==!0,yt=mt.__version===void 0||ct===!0,at=ot.dataReady,st=S(w,tt);Ht(s.TEXTURE_CUBE_MAP,w);let Mt;if(w.isDepthTexture){if(vt=x(w.format===Rs,w.type),yt)if(dt)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,vt,tt.width,tt.height);else for(let rt=0;rt<6;rt++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,vt,tt.width,tt.height,0,xt,ft,null)}else if(pt){dt&&yt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,st,vt,tt.width,tt.height);for(let rt=0;rt<6;rt++){Mt=et[rt].mipmaps;for(let At=0;At<Mt.length;At++){let se=Mt[At];w.format!==Ji?xt!==null?dt?at&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At,0,0,se.width,se.height,xt,se.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At,vt,se.width,se.height,0,se.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):dt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At,0,0,se.width,se.height,xt,ft,se.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At,vt,se.width,se.height,0,xt,ft,se.data)}}}else{if(Mt=w.mipmaps,dt&&yt){Mt.length>0&&st++;let rt=kt(et[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,st,vt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(N){dt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,et[rt].width,et[rt].height,xt,ft,et[rt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,vt,et[rt].width,et[rt].height,0,xt,ft,et[rt].data);for(let At=0;At<Mt.length;At++){let Yt=Mt[At].image[rt].image;dt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At+1,0,0,Yt.width,Yt.height,xt,ft,Yt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At+1,vt,Yt.width,Yt.height,0,xt,ft,Yt.data)}}else{dt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,xt,ft,et[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,vt,xt,ft,et[rt]);for(let At=0;At<Mt.length;At++){let se=Mt[At];dt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At+1,0,0,xt,ft,se.image[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,At+1,vt,xt,ft,se.image[rt])}}}E(w)&&w.mipmapsAutoUpdate===!0&&y(s.TEXTURE_CUBE_MAP),mt.__version=ot.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function ie(P,w,q,ct,ot,mt){let St=r.convert(q.format,q.colorSpace),Y=r.convert(q.type),nt=b(q.internalFormat,St,Y,q.normalized,q.colorSpace),pt=n.get(w),N=n.get(q);if(N.__renderTarget=w,!pt.__hasExternalTextures){let et=Math.max(1,w.width>>mt),tt=Math.max(1,w.height>>mt);ot===s.TEXTURE_3D||ot===s.TEXTURE_2D_ARRAY?e.texImage3D(ot,mt,nt,et,tt,w.depth,0,St,Y,null):e.texImage2D(ot,mt,nt,et,tt,0,St,Y,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),_t(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ct,ot,N.__webglTexture,0,Wt(w)):(ot===s.TEXTURE_2D||ot>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ct,ot,N.__webglTexture,mt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Je(P,w,q){if(s.bindRenderbuffer(s.RENDERBUFFER,P),w.depthBuffer){let ct=w.depthTexture,ot=ct&&ct.isDepthTexture?ct.type:null,mt=x(w.stencilBuffer,ot),St=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;_t(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt(w),mt,w.width,w.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt(w),mt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,mt,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,St,s.RENDERBUFFER,P)}else{let ct=w.textures;for(let ot=0;ot<ct.length;ot++){let mt=ct[ot],St=r.convert(mt.format,mt.colorSpace),Y=r.convert(mt.type),nt=b(mt.internalFormat,St,Y,mt.normalized,mt.colorSpace);_t(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt(w),nt,w.width,w.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt(w),nt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,nt,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function we(P,w,q){let ct=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ot=n.get(w.depthTexture);ot.__renderTarget=w;let mt=ct?w.depthTexture.image[0]:w.depthTexture.image;(!ot.__webglTexture||mt.width!==w.width||mt.height!==w.height)&&(mt.width=w.width,mt.height=w.height,w.depthTexture.needsUpdate=!0),ct?lt(w.depthTexture,0):it(w.depthTexture,0);let St=ot.__webglTexture,Y=Wt(w),nt=ct?s.TEXTURE_CUBE_MAP_POSITIVE_X+q:s.TEXTURE_2D,pt=w.depthTexture.format===Rs?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(w.depthTexture.format===Es)_t(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pt,nt,St,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,pt,nt,St,0);else if(w.depthTexture.format===Rs)_t(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pt,nt,St,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,pt,nt,St,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ce(P){let w=n.get(P),q=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){let ct=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ct){let ot=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ct.removeEventListener("dispose",ot)};ct.addEventListener("dispose",ot),w.__depthDisposeCallback=ot}w.__boundDepthTexture=ct}if(P.depthTexture&&!w.__autoAllocateDepthBuffer)if(q)for(let ct=0;ct<6;ct++)we(w.__webglFramebuffer[ct],P,ct);else P.texture.mipmaps.length>0?we(w.__webglFramebuffer[0],P,0):we(w.__webglFramebuffer,P,0);else if(q){w.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[ct]),w.__webglDepthbuffer[ct]===void 0)w.__webglDepthbuffer[ct]=s.createRenderbuffer(),Je(w.__webglDepthbuffer[ct],P,!1);else{let ot=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=w.__webglDepthbuffer[ct];s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ot,s.RENDERBUFFER,mt)}}else if(P.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Je(w.__webglDepthbuffer,P,!1);else{let ot=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ot,s.RENDERBUFFER,mt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function He(P,w,q){let ct=n.get(P);w!==void 0&&ie(ct.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&ce(P)}function Ze(P){let w=P.texture,q=n.get(P),ct=n.get(w);P.addEventListener("dispose",I),R(P);let ot=P.textures,mt=P.isWebGLCubeRenderTarget===!0,St=ot.length>1;if(St||(ct.__webglTexture===void 0&&(ct.__webglTexture=s.createTexture()),ct.__version=w.version,o.memory.textures++),mt){q.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(w.mipmaps.length>0){q.__webglFramebuffer[Y]=[];for(let nt=0;nt<w.mipmaps.length;nt++)q.__webglFramebuffer[Y][nt]=s.createFramebuffer()}else q.__webglFramebuffer[Y]=s.createFramebuffer()}else{if(w.mipmaps.length>0){q.__webglFramebuffer=[];for(let Y=0;Y<w.mipmaps.length;Y++)q.__webglFramebuffer[Y]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(St)for(let Y=0,nt=ot.length;Y<nt;Y++){let pt=n.get(ot[Y]);pt.__webglTexture===void 0&&(pt.__webglTexture=s.createTexture(),o.memory.textures++)}if(P.samples>0&&_t(P)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Y=0;Y<ot.length;Y++){let nt=ot[Y];q.__webglColorRenderbuffer[Y]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[Y]);let pt=r.convert(nt.format,nt.colorSpace),N=r.convert(nt.type),et=b(nt.internalFormat,pt,N,nt.normalized,nt.colorSpace,P.isXRRenderTarget===!0),tt=Wt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,et,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Y,s.RENDERBUFFER,q.__webglColorRenderbuffer[Y])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),Je(q.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(mt){e.bindTexture(s.TEXTURE_CUBE_MAP,ct.__webglTexture),Ht(s.TEXTURE_CUBE_MAP,w);for(let Y=0;Y<6;Y++)if(w.mipmaps.length>0)for(let nt=0;nt<w.mipmaps.length;nt++)ie(q.__webglFramebuffer[Y][nt],P,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,nt);else ie(q.__webglFramebuffer[Y],P,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);E(w)?y(s.TEXTURE_CUBE_MAP):w.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),e.unbindTexture()}else if(St){for(let Y=0,nt=ot.length;Y<nt;Y++){let pt=ot[Y],N=n.get(pt),et=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(et=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(et,N.__webglTexture),Ht(et,pt),ie(q.__webglFramebuffer,P,pt,s.COLOR_ATTACHMENT0+Y,et,0),E(pt)&&y(et)}e.unbindTexture()}else{let Y=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Y=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Y,ct.__webglTexture),Ht(Y,w),w.mipmaps.length>0)for(let nt=0;nt<w.mipmaps.length;nt++)ie(q.__webglFramebuffer[nt],P,w,s.COLOR_ATTACHMENT0,Y,nt);else ie(q.__webglFramebuffer,P,w,s.COLOR_ATTACHMENT0,Y,0);E(w)?y(Y):w.mipmaps.length>0&&s.texParameteri(Y,s.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),e.unbindTexture()}P.depthBuffer&&ce(P)}function k(P){let w=P.textures;for(let q=0,ct=w.length;q<ct;q++){let ot=w[q];if(E(ot)&&ot.mipmapsAutoUpdate===!0){let mt=M(P),St=n.get(ot).__webglTexture;e.bindTexture(mt,St),y(mt),e.unbindTexture()}}}let _e=[];function de(P){if(P.samples>0){if(_t(P)===!1){let w=P.textures,q=P.width,ct=P.height,ot=s.COLOR_BUFFER_BIT,mt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,St=n.get(P),Y=w.length>1;if(Y)for(let pt=0;pt<w.length;pt++)e.bindFramebuffer(s.FRAMEBUFFER,St.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,St.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),P.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let pt=0;pt<w.length;pt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ot|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ot|=s.STENCIL_BUFFER_BIT)),Y){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,St.__webglColorRenderbuffer[pt]);let N=n.get(w[pt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,N,0)}s.blitFramebuffer(0,0,q,ct,0,0,q,ct,ot,s.NEAREST),l===!0&&(_e.length=0,_e.push(s.COLOR_ATTACHMENT0+pt),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&_e.push(mt),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,_e))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Y)for(let pt=0;pt<w.length;pt++){e.bindFramebuffer(s.FRAMEBUFFER,St.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,St.__webglColorRenderbuffer[pt]);let N=n.get(w[pt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,St.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,N,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let w=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function Wt(P){return Math.min(i.maxSamples,P.samples)}function _t(P){let w=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function me(P){let w=o.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function Ft(P,w){let q=P.colorSpace,ct=P.format,ot=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||q!==Pa&&q!==Cs&&(le.getTransfer(q)===ye?(ct!==Ji||ot!==jn)&&Gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",q)),w}function kt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=C,this.getTextureUnits=K,this.setTextureUnits=gt,this.setTexture2D=it,this.setTexture2DArray=ut,this.setTexture3D=bt,this.setTextureCube=lt,this.rebindTextures=He,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=_t,this.dispose=B}function V1(s,t){function e(n,i=Cs){let r,o=le.getTransfer(i);if(n===jn)return s.UNSIGNED_BYTE;if(n===ih)return s.UNSIGNED_SHORT_4_4_4_4;if(n===sh)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Dd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Nd)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Id)return s.BYTE;if(n===Ld)return s.SHORT;if(n===Wo)return s.UNSIGNED_SHORT;if(n===nh)return s.INT;if(n===Zi)return s.UNSIGNED_INT;if(n===Di)return s.FLOAT;if(n===$i)return s.HALF_FLOAT;if(n===Ud)return s.ALPHA;if(n===Od)return s.RGB;if(n===Ji)return s.RGBA;if(n===Es)return s.DEPTH_COMPONENT;if(n===Rs)return s.DEPTH_STENCIL;if(n===rh)return s.RED;if(n===oh)return s.RED_INTEGER;if(n===sr)return s.RG;if(n===ah)return s.RG_INTEGER;if(n===lh)return s.RGBA_INTEGER;if(n===tl||n===el||n===nl||n===il)if(o===ye)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===tl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===el)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===il)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===tl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===el)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===il)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ch||n===hh||n===uh||n===dh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ch)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===hh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===uh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===dh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fh||n===ph||n===mh||n===gh||n===_h||n===sl||n===xh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===fh||n===ph)return o===ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===mh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===gh)return r.COMPRESSED_R11_EAC;if(n===_h)return r.COMPRESSED_SIGNED_R11_EAC;if(n===sl)return r.COMPRESSED_RG11_EAC;if(n===xh)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===vh||n===yh||n===Sh||n===Mh||n===bh||n===wh||n===Th||n===Eh||n===Ah||n===Rh||n===Ch||n===Ph||n===Ih||n===Lh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===vh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Mh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===bh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Th)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Eh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ah)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ch)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ph)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ih)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lh)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Dh||n===Nh||n===Uh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Dh)return o===ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Oh||n===Fh||n===rl||n===Bh)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Oh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Br?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var W1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,hf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ha(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Li({vertexShader:W1,fragmentShader:X1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new js(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},uf=class extends is{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,p=null,_=typeof XRWebGLBinding<"u",m=new hf,g={},v=e.getContextAttributes(),E=null,y=null,M=[],b=[],x=new ne,S=null,R=null,A=new In;A.viewport=new Ne;let D=new In;D.viewport=new Ne;let I=[A,D],F=new Kc,L=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let it=M[z];return it===void 0&&(it=new No,M[z]=it),it.getTargetRaySpace()},this.getControllerGrip=function(z){let it=M[z];return it===void 0&&(it=new No,M[z]=it),it.getGripSpace()},this.getHand=function(z){let it=M[z];return it===void 0&&(it=new No,M[z]=it),it.getHandSpace()};function G(z){let it=b.indexOf(z.inputSource);if(it===-1)return;let ut=M[it];ut!==void 0&&(ut.update(z.inputSource,z.frame,c||o),ut.dispatchEvent({type:z.type,data:z.inputSource}))}function O(){i.removeEventListener("select",G),i.removeEventListener("selectstart",G),i.removeEventListener("selectend",G),i.removeEventListener("squeeze",G),i.removeEventListener("squeezestart",G),i.removeEventListener("squeezeend",G),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",$);for(let z=0;z<M.length;z++){let it=b[z];it!==null&&(b[z]=null,M[z].disconnect(it))}L=null,B=null,m.reset();for(let z in g)delete g[z];if(t.setRenderTarget(E),d=null,u=null,f=null,i=null,y=null,j.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(x.width,x.height,!1),R!==null){let z=R.camera;z.fov=R.fov,z.zoom=R.zoom,z.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,n.isPresenting===!0&&Gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,n.isPresenting===!0&&Gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(i,e)),f},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(z){if(i=z,i!==null){if(E=t.getRenderTarget(),i.addEventListener("select",G),i.addEventListener("selectstart",G),i.addEventListener("selectend",G),i.addEventListener("squeeze",G),i.addEventListener("squeezestart",G),i.addEventListener("squeezeend",G),i.addEventListener("end",O),i.addEventListener("inputsourceschange",$),v.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ut=null,bt=null,lt=null;v.depth&&(lt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=v.stencil?Rs:Es,bt=v.stencil?Br:Zi);let Ct={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Ct),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new di(u.textureWidth,u.textureHeight,{format:Ji,type:jn,depthTexture:new As(u.textureWidth,u.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ut={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,ut),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new di(d.framebufferWidth,d.framebufferHeight,{format:Ji,type:jn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),j.setContext(i),j.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function $(z){for(let it=0;it<z.removed.length;it++){let ut=z.removed[it],bt=b.indexOf(ut);bt>=0&&(b[bt]=null,M[bt].disconnect(ut))}for(let it=0;it<z.added.length;it++){let ut=z.added[it],bt=b.indexOf(ut);if(bt===-1){for(let Ct=0;Ct<M.length;Ct++)if(Ct>=b.length){b.push(ut),bt=Ct;break}else if(b[Ct]===null){b[Ct]=ut,bt=Ct;break}if(bt===-1)break}let lt=M[bt];lt&&lt.connect(ut)}}function V(z,it){it===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(it.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(i===null)return;let it=z.near,ut=z.far;m.texture!==null&&(m.depthNear>0&&(it=m.depthNear),m.depthFar>0&&(ut=m.depthFar)),F.near=D.near=A.near=it,F.far=D.far=A.far=ut,(L!==F.near||B!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),L=F.near,B=F.far),F.layers.mask=z.layers.mask|6,A.layers.mask=F.layers.mask&-5,D.layers.mask=F.layers.mask&-3;let bt=z.parent,lt=F.cameras;V(F,bt);for(let Ct=0;Ct<lt.length;Ct++)V(lt[Ct],bt);F.projectionMatrix.copy(A.projectionMatrix),F.projectionMatrixInverse.copy(A.projectionMatrixInverse),R===null&&z.isPerspectiveCamera&&(R={camera:z,fov:z.fov,zoom:z.zoom}),C(z,F,bt)};function C(z,it,ut){ut===null?z.matrix.copy(it.matrixWorld):(z.matrix.copy(ut.matrixWorld),z.matrix.invert(),z.matrix.multiply(it.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(it.projectionMatrix),z.projectionMatrixInverse.copy(it.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Lo*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(z){l=z,u!==null&&(u.fixedFoveation=z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(z){return g[z]};let K=null;function gt(z,it){if(h=it.getViewerPose(c||o),p=it,h!==null){let ut=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let bt=!1;ut.length!==F.cameras.length&&(F.cameras.length=0,bt=!0);for(let Pt=0;Pt<ut.length;Pt++){let Ht=ut[Pt],It=null;if(d!==null)It=d.getViewport(Ht);else{let pe=f.getViewSubImage(u,Ht);It=pe.viewport,Pt===0&&(t.setRenderTargetTextures(y,pe.colorTexture,pe.depthStencilTexture),t.setRenderTarget(y))}let Ot=I[Pt];Ot===void 0&&(Ot=new In,Ot.layers.enable(Pt),Ot.viewport=new Ne,I[Pt]=Ot),Ot.matrix.fromArray(Ht.transform.matrix),Ot.matrix.decompose(Ot.position,Ot.quaternion,Ot.scale),Ot.projectionMatrix.fromArray(Ht.projectionMatrix),Ot.projectionMatrixInverse.copy(Ot.projectionMatrix).invert(),Ot.viewport.set(It.x,It.y,It.width,It.height),Pt===0&&(F.matrix.copy(Ot.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),bt===!0&&F.cameras.push(Ot)}let lt=i.enabledFeatures;if(lt&&lt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){f=n.getBinding();let Pt=f.getDepthInformation(ut[0]);Pt&&Pt.isValid&&Pt.texture&&m.init(Pt,i.renderState)}if(lt&&lt.includes("camera-access")&&_){t.state.unbindTexture(),f=n.getBinding();for(let Pt=0;Pt<ut.length;Pt++){let Ht=ut[Pt].camera;if(Ht){let It=g[Ht];It||(It=new Ha,g[Ht]=It);let Ot=f.getCameraImage(Ht);It.sourceTexture=Ot}}}}for(let ut=0;ut<M.length;ut++){let bt=b[ut],lt=M[ut];bt!==null&&lt!==void 0&&lt.update(bt,it,c||o)}K&&K(z,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),p=null}let j=new wg;j.setAnimationLoop(gt),this.setAnimationLoop=function(z){K=z},this.dispose=function(){}}},q1=new ge,Ng=new qt;Ng.set(-1,0,0,0,1,0,0,0,1);function Y1(s,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,qd(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,v,E,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),f(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),u(m,g),g.isMeshPhysicalMaterial&&d(m,g,y)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,v,E):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Mn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Mn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let v=t.get(g),E=v.envMap,y=v.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(q1.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ng),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,v,E){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=E*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function u(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,v){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Mn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){let v=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Z1(s,t,e,n){let i={},r={};function o(v,E){let y=E.program;n.uniformBlockBinding(v,y,i[v.id])}function a(v,E){let y=i[v.id];y===void 0&&(p(v),y=l(v),i[v.id]=y,v.addEventListener("dispose",m));let M=E.program;n.updateUBOMapping(v,M);let b=t.render.frame;r[v.id]!==b&&(c(v),r[v.id]=b)}function l(v){let E=s.createBuffer(),y=v.__size,M=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,y,M),s.bindBuffer(s.UNIFORM_BUFFER,null),E}function c(v){let E=i[v.id],y=v.uniforms,M=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let b=0,x=y.length;b<x;b++){let S=y[b];if(Array.isArray(S))for(let R=0,A=S.length;R<A;R++)h(S[R],b,R,M);else h(S,b,0,M)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(v,E,y,M){if(u(v,E,y,M)===!0){let b=v.__offset,x=v.value;if(Array.isArray(x)){let S=0;for(let R=0;R<x.length;R++){let A=x[R],D=_(A,!0);f(A,v.__data,S),S+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else f(x,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,v.__data)}}function f(v,E,y){typeof v=="number"||typeof v=="boolean"?E[y]=v:v.isMatrix3?(E[y]=v.elements[0],E[y+1]=v.elements[1],E[y+2]=v.elements[2],E[y+3]=0,E[y+4]=v.elements[3],E[y+5]=v.elements[4],E[y+6]=v.elements[5],E[y+7]=0,E[y+8]=v.elements[6],E[y+9]=v.elements[7],E[y+10]=v.elements[8],E[y+11]=0):ArrayBuffer.isView(v)?E.set(v.subarray(0,E.length-y),y):v.toArray(E,y)}function u(v,E,y,M){let b=v.value,x=E+"_"+y;if(Array.isArray(b)){M[x]===void 0&&(M[x]=[]);let S=M[x],R=!1;for(let A=0;A<b.length;A++)d(b[A],S,A)===!0&&(R=!0);return R}return d(b,M,x)}function d(v,E,y){if(E[y]===void 0)return typeof v=="number"||typeof v=="boolean"?E[y]=v:ArrayBuffer.isView(v)?E[y]=v.slice():E[y]=v.clone(),!0;{let M=E[y];if(typeof v=="number"||typeof v=="boolean"){if(M!==v)return E[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(M.equals(v)===!1)return M.copy(v),!0}}return!1}function p(v){let E=v.uniforms,y=0,M=16;for(let x=0,S=E.length;x<S;x++){let R=Array.isArray(E[x])?E[x]:[E[x]];for(let A=0,D=R.length;A<D;A++){let I=R[A],F=Array.isArray(I.value)?I.value:[I.value],L=Array.isArray(E[x])||Array.isArray(I.value),B=y;for(let O=0,$=F.length;O<$;O++){let V=F[O],C=_(V,L),K=y%M,gt=K%C.boundary,j=K+gt;y+=gt,j!==0&&M-j<C.storage&&(y+=M-j),O===0&&(B=y),y+=C.storage}let G=I.type==="int"?Int32Array:I.type==="uint"?Uint32Array:Float32Array;I.__data=new G((y-B)/Float32Array.BYTES_PER_ELEMENT),I.__offset=B}}let b=y%M;return b>0&&(y+=M-b),v.__size=y,v.__cache={},this}function _(v,E){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?Gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Gt("WebGLRenderer: Unsupported uniform value type.",v),E===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function m(v){let E=v.target;E.removeEventListener("dispose",m),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function g(){for(let v in i)s.deleteBuffer(i[v]);i={},r={}}return{bind:o,update:a,dispose:g}}var $1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),as=null;function J1(){return as===null&&(as=new Ba($1,16,16,sr,$i),as.name="DFG_LUT",as.minFilter=Hn,as.magFilter=Hn,as.wrapS=ns,as.wrapT=ns,as.generateMipmaps=!1,as.needsUpdate=!0),as}var Hh=class{constructor(t={}){let{canvas:e=Ym(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=jn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=d,m=new Set([lh,ah,oh]),g=new Set([jn,Zi,Wo,Br,ih,sh]),v=new Uint32Array(4),E=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},M=null,b=null,x=[],S=[],R=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=rs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,D=!1,I=null,F=null,L=null,B=null;this._outputColorSpace=Sn;let G=0,O=0,$=null,V=-1,C=null,K=new Ne,gt=new Ne,j=null,z=new Xt(0),it=0,ut=e.width,bt=e.height,lt=1,Ct=null,re=null,Pt=new Ne(0,0,ut,bt),Ht=new Ne(0,0,ut,bt),It=!1,Ot=new Qs,pe=new Oc,ue=!1,Q=!1,ie=new ge,Je=new W,we=new Ne,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},He=!1;function Ze(){return $===null?lt:1}let k=n;function _e(T,U){return e.getContext(T,U)}let de,Wt,_t,me,Ft,kt,P,w,q,ct,ot,mt,St,Y,nt,pt,N,et,tt,xt,ft,vt,dt;try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",rt,!1),k===null){let U="webgl2";if(k=_e(U,T),k===null)throw _e(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}yt()}catch(T){throw e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),Vt("WebGLRenderer: "+T.message),T}function yt(){de=new aM(k),de.init(),ft=new V1(k,de),Wt=new JS(k,de,t,ft),_t=new G1(k,de),Wt.reversedDepthBuffer&&u&&_t.buffers.depth.setReversed(!0),F=k.createFramebuffer(),L=k.createFramebuffer(),B=k.createFramebuffer(),me=new hM(k),Ft=new A1,kt=new H1(k,de,_t,Ft,Wt,ft,me),P=new oM(A),w=new dv(k),vt=new ZS(k,w),q=new lM(k,w,me,vt),ct=new dM(k,q,w,vt,me),et=new uM(k,Wt,kt),nt=new KS(Ft),ot=new E1(A,P,de,Wt,vt,nt),mt=new Y1(A,Ft),St=new C1,Y=new U1(de),N=new YS(A,P,_t,ct,p,l),pt=new k1(A,ct,Wt),dt=new Z1(k,me,Wt,_t),tt=new $S(k,de,me),xt=new cM(k,de,me),me.programs=ot.programs,A.capabilities=Wt,A.extensions=de,A.properties=Ft,A.renderLists=St,A.shadowMap=pt,A.state=_t,A.info=me}_!==jn&&(R=new pM(_,e.width,e.height,a,i,r));let at=new uf(A,k);this.xr=at,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let T=de.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=de.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return lt},this.setPixelRatio=function(T){T!==void 0&&(lt=T,this.setSize(ut,bt,!1))},this.getSize=function(T){return T.set(ut,bt)},this.setSize=function(T,U,J=!0){if(at.isPresenting){Gt("WebGLRenderer: Can't change size while VR device is presenting.");return}ut=T,bt=U,e.width=Math.floor(T*lt),e.height=Math.floor(U*lt),J===!0&&(e.style.width=T+"px",e.style.height=U+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(ut*lt,bt*lt).floor()},this.setDrawingBufferSize=function(T,U,J){ut=T,bt=U,lt=J,e.width=Math.floor(T*J),e.height=Math.floor(U*J),this.setViewport(0,0,T,U)},this.setEffects=function(T){if(_===jn){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let U=0;U<T.length;U++)if(T[U].isOutputPass===!0){Gt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(K)},this.getViewport=function(T){return T.copy(Pt)},this.setViewport=function(T,U,J,X){T.isVector4?Pt.set(T.x,T.y,T.z,T.w):Pt.set(T,U,J,X),_t.viewport(K.copy(Pt).multiplyScalar(Ze()).round())},this.getScissor=function(T){return T.copy(Ht)},this.setScissor=function(T,U,J,X){T.isVector4?Ht.set(T.x,T.y,T.z,T.w):Ht.set(T,U,J,X),_t.scissor(gt.copy(Ht).multiplyScalar(Ze()).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(T){_t.setScissorTest(It=T)},this.setOpaqueSort=function(T){Ct=T},this.setTransparentSort=function(T){re=T},this.getClearColor=function(T){return T.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(T=!0,U=!0,J=!0){let X=0;if(T){let Z=!1;if($!==null){let Tt=$.texture.format;Z=m.has(Tt)}if(Z){let Tt=$.texture.type,Dt=g.has(Tt),wt=N.getClearColor(),Rt=N.getClearAlpha(),Bt=wt.r,Zt=wt.g,oe=wt.b;Dt?(v[0]=Bt,v[1]=Zt,v[2]=oe,v[3]=Rt,k.clearBufferuiv(k.COLOR,0,v)):(E[0]=Bt,E[1]=Zt,E[2]=oe,E[3]=Rt,k.clearBufferiv(k.COLOR,0,E))}else X|=k.COLOR_BUFFER_BIT}U&&(X|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&k.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),I=T},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),N.dispose(),St.dispose(),Y.dispose(),kt.dispose(),Ft.dispose(),P.dispose(),ct.dispose(),q.dispose(),vt.dispose(),dt.dispose(),ot.dispose(),at.dispose(),at.removeEventListener("sessionstart",Te),at.removeEventListener("sessionend",ve),rn.stop()};function st(T){T.preventDefault(),Gd("WebGLRenderer: Context Lost."),D=!0}function Mt(){Gd("WebGLRenderer: Context Restored."),D=!1;let T=me.autoReset,U=pt.enabled,J=pt.autoUpdate,X=pt.needsUpdate,Z=pt.type;yt(),me.autoReset=T,pt.enabled=U,pt.autoUpdate=J,pt.needsUpdate=X,pt.type=Z}function rt(T){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function At(T){let U=T.target;U.removeEventListener("dispose",At),se(U)}function se(T){Yt(T),Ft.remove(T)}function Yt(T){let U=Ft.get(T).programs;U!==void 0&&(U.forEach(function(J){ot.releaseProgram(J)}),T.isShaderMaterial&&ot.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,J,X,Z,Tt){U===null&&(U=ce);let Dt=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,wt=Ti(T,U,J,X,Z);_t.setMaterial(X,Dt);let Rt=J.index,Bt=1;if(X.wireframe===!0){if(Rt=q.getWireframeAttribute(J),Rt===void 0)return;Bt=2}let Zt=J.drawRange,oe=J.attributes.position,Nt=Zt.start*Bt,ae=(Zt.start+Zt.count)*Bt;Tt!==null&&(Nt=Math.max(Nt,Tt.start*Bt),ae=Math.min(ae,(Tt.start+Tt.count)*Bt)),Rt!==null?(Nt=Math.max(Nt,0),ae=Math.min(ae,Rt.count)):oe!=null&&(Nt=Math.max(Nt,0),ae=Math.min(ae,oe.count));let je=ae-Nt;if(je<0||je===1/0)return;vt.setup(Z,X,wt,J,Rt);let Ce,Ae=tt;if(Rt!==null&&(Ce=w.get(Rt),Ae=xt,Ae.setIndex(Ce)),Z.isMesh)X.wireframe===!0?(_t.setLineWidth(X.wireframeLinewidth*Ze()),Ae.setMode(k.LINES)):Ae.setMode(k.TRIANGLES);else if(Z.isLine){let An=X.linewidth;An===void 0&&(An=1),_t.setLineWidth(An*Ze()),Z.isLineSegments?Ae.setMode(k.LINES):Z.isLineLoop?Ae.setMode(k.LINE_LOOP):Ae.setMode(k.LINE_STRIP)}else Z.isPoints?Ae.setMode(k.POINTS):Z.isSprite&&Ae.setMode(k.TRIANGLES);if(Z.isBatchedMesh)if(de.get("WEBGL_multi_draw"))Ae.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let An=Z._multiDrawStarts,Ut=Z._multiDrawCounts,Gn=Z._multiDrawCount,xe=Rt?w.get(Rt).bytesPerElement:1,Er=Ft.get(X).currentProgram.getUniforms();for(let Rn=0;Rn<Gn;Rn++)Er.setValue(k,"_gl_DrawID",Rn),Ae.render(An[Rn]/xe,Ut[Rn])}else if(Z.isInstancedMesh)Ae.renderInstances(Nt,je,Z.count);else if(J.isInstancedBufferGeometry){let An=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ut=Math.min(J.instanceCount,An);Ae.renderInstances(Nt,je,Ut)}else Ae.render(Nt,je)};function Le(T,U,J,X){I!==null&&T.isNodeMaterial&&I.setObject(X,T),ue===!0&&nt.setState(T,J,!1),T.transparent===!0&&T.side===pi&&T.forceSinglePass===!1?(T.side=Mn,T.needsUpdate=!0,ai(T,U,X),T.side=ir,T.needsUpdate=!0,ai(T,U,X),T.side=pi):ai(T,U,X)}this.compile=function(T,U,J=null){J===null&&(J=T),I!==null&&I.renderStart(T,U,J),b=Y.get(J),b.init(U),S.push(b),J.traverseVisible(function(Z){Z.isLight&&Z.layers.test(U.layers)&&(b.pushLight(Z),Z.castShadow&&b.pushShadow(Z))}),T!==J&&T.traverseVisible(function(Z){Z.isLight&&Z.layers.test(U.layers)&&(b.pushLight(Z),Z.castShadow&&b.pushShadow(Z))}),b.setupLights(),I!==null&&I.updateLights(b.state.lightsArray),Q=this.localClippingEnabled,ue=nt.init(this.clippingPlanes,Q),ue===!0&&nt.setGlobalState(this.clippingPlanes,U),I!==null&&pt.render(b.state.shadowsArray,J,U);let X=new Set;return T.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Tt=Z.material;if(Tt)if(Array.isArray(Tt))for(let Dt=0;Dt<Tt.length;Dt++){let wt=Tt[Dt];Le(wt,J,U,Z),X.add(wt)}else Le(Tt,J,U,Z),X.add(Tt)}),b=S.pop(),I!==null&&I.renderEnd(),X},this.compileAsync=function(T,U,J=null){let X=this.compile(T,U,J);return new Promise(Z=>{function Tt(){if(X.forEach(function(Dt){let Rt=Ft.get(Dt).currentProgram;(Rt===void 0||Rt.isReady())&&X.delete(Dt)}),X.size===0){Z(T);return}setTimeout(Tt,10)}de.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let Ke=null;function De(T){Ke&&Ke(T)}function Te(){rn.stop()}function ve(){rn.start()}let rn=new wg;rn.setAnimationLoop(De),typeof self<"u"&&rn.setContext(self),this.setAnimationLoop=function(T){Ke=T,at.setAnimationLoop(T),T===null?rn.stop():rn.start()},at.addEventListener("sessionstart",Te),at.addEventListener("sessionend",ve),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;I!==null&&I.renderStart(T,U);let J=at.enabled===!0&&at.isPresenting===!0,X=R!==null&&($===null||J)&&R.begin(A,$);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(U),U=at.getCamera()),T.isScene===!0&&T.onBeforeRender(A,T,U,$),b=Y.get(T,S.length),b.init(U),b.state.textureUnits=kt.getTextureUnits(),S.push(b),ie.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?pe.setFromArrayCamera(U):Ot.setFromProjectionMatrix(ie,Ai,U.reversedDepth),Q=this.localClippingEnabled,ue=nt.init(this.clippingPlanes,Q),M=St.get(T,x.length),M.init(),x.push(M),this.info.render.frame++,at.enabled===!0&&at.isPresenting===!0){let Dt=A.xr.getDepthSensingMesh();Dt!==null&&Ee(Dt,U,-1/0,A.sortObjects)}Ee(T,U,0,A.sortObjects),M.finish(),I!==null&&I.updateLights(b.state.lightsArray),A.sortObjects===!0&&M.sort(Ct,re),He=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,He&&N.addToRenderList(M,T),this.info.autoReset===!0&&this.info.reset(),ue===!0&&nt.beginShadows();let Z=b.state.shadowsArray;if(pt.render(Z,T,U),ue===!0&&nt.endShadows(),(X&&R.hasRenderPass())===!1){let Dt=M.opaque,wt=M.transmissive;if(b.setupLights(),U.isArrayCamera){let Rt=U.cameras;if(wt.length>0)for(let Bt=0,Zt=Rt.length;Bt<Zt;Bt++){let oe=Rt[Bt];oi(Dt,wt,T,oe)}He&&N.render(T);for(let Bt=0,Zt=Rt.length;Bt<Zt;Bt++){let oe=Rt[Bt];En(M,T,oe,oe.viewport)}}else wt.length>0&&oi(Dt,wt,T,U),He&&N.render(T),En(M,T,U)}$!==null&&O===0&&(kt.updateMultisampleRenderTarget($),kt.updateRenderTargetMipmap($)),X&&R.end(A),T.isScene===!0&&T.onAfterRender(A,T,U),vt.resetDefaultState(),V=-1,C=null,S.pop(),S.length>0?(b=S[S.length-1],kt.setTextureUnits(b.state.textureUnits),ue===!0&&nt.setGlobalState(A.clippingPlanes,b.state.camera)):b=null,x.pop(),x.length>0?M=x[x.length-1]:M=null,I!==null&&I.renderEnd()};function Ee(T,U,J,X){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){let Dt=U.isArrayCamera?pe:Ot;if(!T.frustumCulled||T.intersectsFrustum(Dt)){X&&we.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ie);let wt=ct.update(T),Rt=T.material;Rt.visible&&M.push(T,wt,Rt,J,we.z,null,U)}}else if(T.isMesh||T.isLine||T.isPoints){let Dt=U.isArrayCamera?pe:Ot;if(!T.frustumCulled||T.intersectsFrustum(Dt)){let wt=ct.update(T),Rt=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),we.copy(T.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),we.copy(wt.boundingSphere.center)),we.applyMatrix4(T.matrixWorld).applyMatrix4(ie)),Array.isArray(Rt)){let Bt=wt.groups;for(let Zt=0,oe=Bt.length;Zt<oe;Zt++){let Nt=Bt[Zt],ae=Rt[Nt.materialIndex];ae&&ae.visible&&M.push(T,wt,ae,J,we.z,Nt,U)}}else Rt.visible&&M.push(T,wt,Rt,J,we.z,null,U)}}}let Tt=T.children;for(let Dt=0,wt=Tt.length;Dt<wt;Dt++)Ee(Tt[Dt],U,J,X)}function En(T,U,J,X){let{opaque:Z,transmissive:Tt,transparent:Dt}=T;b.setupLightsView(J),ue===!0&&nt.setGlobalState(A.clippingPlanes,J),X&&_t.viewport(K.copy(X)),Z.length>0&&Ve(Z,U,J),Tt.length>0&&Ve(Tt,U,J),Dt.length>0&&Ve(Dt,U,J),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function oi(T,U,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[X.id]===void 0){let Nt=de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[X.id]=new di(1,1,{generateMipmaps:!0,type:Nt?$i:jn,minFilter:Yi,samples:Math.max(4,Wt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:le.workingColorSpace})}let Tt=b.state.transmissionRenderTarget[X.id],Dt=X.viewport||K;Tt.setSize(Dt.z*A.transmissionResolutionScale,Dt.w*A.transmissionResolutionScale);let wt=A.getRenderTarget(),Rt=A.getActiveCubeFace(),Bt=A.getActiveMipmapLevel();A.setRenderTarget(Tt),A.getClearColor(z),it=A.getClearAlpha(),it<1&&A.setClearColor(16777215,.5),A.clear(),He&&N.render(J);let Zt=A.toneMapping;A.toneMapping=rs;let oe=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),b.setupLightsView(X),ue===!0&&nt.setGlobalState(A.clippingPlanes,X),Ve(T,J,X),kt.updateMultisampleRenderTarget(Tt),kt.updateRenderTargetMipmap(Tt),de.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let ae=0,je=U.length;ae<je;ae++){let Ce=U[ae],{object:Ae,geometry:An,material:Ut,group:Gn}=Ce;if(Ut.side===pi&&Ae.layers.test(X.layers)){let xe=Ut.side;Ut.side=Mn,Ut.needsUpdate=!0,Qe(Ae,J,X,An,Ut,Gn),Ut.side=xe,Ut.needsUpdate=!0,Nt=!0}}Nt===!0&&(kt.updateMultisampleRenderTarget(Tt),kt.updateRenderTargetMipmap(Tt))}A.setRenderTarget(wt,Rt,Bt),A.setClearColor(z,it),oe!==void 0&&(X.viewport=oe),A.toneMapping=Zt}function Ve(T,U,J){let X=U.isScene===!0?U.overrideMaterial:null;for(let Z=0,Tt=T.length;Z<Tt;Z++){let Dt=T[Z],{object:wt,geometry:Rt,group:Bt}=Dt,Zt=Dt.material;Zt.allowOverride===!0&&X!==null&&(Zt=X),wt.layers.test(J.layers)&&Qe(wt,U,J,Rt,Zt,Bt)}}function Qe(T,U,J,X,Z,Tt){I!==null&&Z.isNodeMaterial&&I.setObject(T,Z),T.onBeforeRender(A,U,J,X,Z,Tt),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Z.onBeforeRender(A,U,J,X,T,Tt),Z.transparent===!0&&Z.side===pi&&Z.forceSinglePass===!1?(Z.side=Mn,Z.needsUpdate=!0,A.renderBufferDirect(J,U,X,Z,T,Tt),Z.side=ir,Z.needsUpdate=!0,A.renderBufferDirect(J,U,X,Z,T,Tt),Z.side=pi):A.renderBufferDirect(J,U,X,Z,T,Tt),T.onAfterRender(A,U,J,X,Z,Tt)}function on(T){let U=0;for(let J of T)J.texture!==null&&U++;return U}function ai(T,U,J){U.isScene!==!0&&(U=ce);let X=Ft.get(T),Z=b.state.lights,Tt=b.state.shadowsArray,Dt=Z.state.version,wt=ot.getParameters(T,Z.state,Tt,U,J,b.state.lightProbeGridArray),Rt=ot.getProgramCacheKey(wt),Bt=X.programs;X.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?U.environment:null,X.fog=U.fog;let Zt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;X.envMap=P.get(T.envMap||X.environment,Zt),X.envMapRotation=X.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,Bt===void 0&&(T.addEventListener("dispose",At),Bt=new Map,X.programs=Bt,X.programVariants=new Map);let oe=Bt.get(Rt);if(oe!==void 0){if(X.currentProgram===oe&&X.lightsStateVersion===Dt)return We(T,wt),oe}else wt.uniforms=ot.getUniforms(T),I!==null&&T.isNodeMaterial&&I.build(T,J,wt),T.onBeforeCompile(wt,A),oe=ot.acquireProgram(wt,Rt),Bt.set(Rt,oe),X.uniforms=wt.uniforms;let Nt=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Nt.clippingPlanes=nt.uniform),We(T,wt),X.needsLights=Kl(T),X.lightsStateVersion=Dt,X.needsLights&&(Nt.ambientLightColor.value=Z.state.ambient,Nt.lightProbe.value=Z.state.probe,Nt.sunLights.value=Z.state.sun,Nt.sunLightShadows.value=Z.state.sunShadow,Nt.directionalLights.value=Z.state.directional,Nt.directionalLightShadows.value=Z.state.directionalShadow,Nt.spotLights.value=Z.state.spot,Nt.spotLightShadows.value=Z.state.spotShadow,Nt.rectAreaLights.value=Z.state.rectArea,Nt.ltc_1.value=Z.state.rectAreaLTC1,Nt.ltc_2.value=Z.state.rectAreaLTC2,Nt.pointLights.value=Z.state.point,Nt.pointLightShadows.value=Z.state.pointShadow,Nt.hemisphereLights.value=Z.state.hemi,Nt.sunShadowMatrix.value=Z.state.sunShadowMatrix,Nt.sunShadowCascade.value=Z.state.sunShadowCascade,Nt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Nt.spotLightMatrix.value=Z.state.spotLightMatrix,Nt.spotLightMap.value=Z.state.spotLightMap,Nt.pointShadowMatrix.value=Z.state.pointShadowMatrix),X.numLightProbeGrids=on(b.state.lightProbeGridArray),X.currentProgram=oe,X.uniformsList=null,oe}function uo(T,U,J,X,Z){let Tt=Ft.get(T),Dt=Tt.currentProgram.id+","+X+","+Z,wt=Tt.programVariants.get(Dt);return wt===void 0?(wt=ai(T,U,J),Tt.programVariants.set(Dt,wt)):(Tt.currentProgram=wt,Tt.uniformsList=null,Tt.outputColorSpace=X,Tt.toneMapping=Z),wt}function an(T){if(T.uniformsList===null){let U=T.currentProgram.getUniforms();T.uniformsList=qo.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function We(T,U){let J=Ft.get(T);J.outputColorSpace=U.outputColorSpace,J.batching=U.batching,J.batchingColor=U.batchingColor,J.instancing=U.instancing,J.instancingColor=U.instancingColor,J.instancingMorph=U.instancingMorph,J.skinning=U.skinning,J.morphTargets=U.morphTargets,J.morphNormals=U.morphNormals,J.morphColors=U.morphColors,J.morphTargetsCount=U.morphTargetsCount,J.numClippingPlanes=U.numClippingPlanes,J.numIntersection=U.numClipIntersection,J.vertexAlphas=U.vertexAlphas,J.vertexTangents=U.vertexTangents,J.toneMapping=U.toneMapping}function Ti(T,U,J,X,Z){U.isScene!==!0&&(U=ce),kt.resetTextureUnits();let Tt=U.fog,Dt=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?U.environment:null,wt=$===null?A.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:le.workingColorSpace,Rt=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Bt=P.get(X.envMap||Dt,Rt),Zt=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,oe=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Nt=!!J.morphAttributes.position,ae=!!J.morphAttributes.normal,je=!!J.morphAttributes.color,Ce=rs;X.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ce=A.toneMapping);let Ae=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,An=Ae!==void 0?Ae.length:0,Ut=Ft.get(X),Gn=b.state.lights;if(ue===!0&&(Q===!0||T!==C)){let Fe=T===C&&X.id===V;nt.setState(X,T,Fe)}let xe=!1,Er=!1;X.version===Ut.__version?Ut.needsLights&&Ut.lightsStateVersion!==Gn.state.version||Z.isBatchedMesh&&Ut.batching===!1||!Z.isBatchedMesh&&Ut.batching===!0||Z.isBatchedMesh&&Ut.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&Ut.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&Ut.instancing===!1||!Z.isInstancedMesh&&Ut.instancing===!0||Z.isSkinnedMesh&&Ut.skinning===!1||!Z.isSkinnedMesh&&Ut.skinning===!0||Z.isInstancedMesh&&Ut.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ut.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ut.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ut.instancingMorph===!1&&Z.morphTexture!==null||Ut.envMap!==Bt||X.fog===!0&&Ut.fog!==Tt||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==nt.numPlanes||Ut.numIntersection!==nt.numIntersection)||Ut.vertexAlphas!==Zt||Ut.vertexTangents!==oe||Ut.morphTargets!==Nt||Ut.morphNormals!==ae||Ut.morphColors!==je||Ut.morphTargetsCount!==An||Ut.numLightProbeGrids!==on(b.state.lightProbeGridArray)?xe=!0:(Ut.outputColorSpace!==wt||Ut.toneMapping!==Ce)&&(Er=!0):(xe=!0,Ut.__version=X.version);let Rn=Ut.currentProgram;(xe===!0||Er===!0)&&(Rn=Er===!0?uo(X,U,Z,wt,Ce):ai(X,U,Z),I&&X.isNodeMaterial&&I.onUpdateProgram(X,Rn,Ut));let Ql=!1,Hs=!1,Ar=!1,fe=Rn.getUniforms(),yn=Ut.uniforms;if(_t.useProgram(Rn.program)&&(Ql=!0,Hs=!0,Ar=!0),X.id!==V&&(V=X.id,Hs=!0),Ql||C!==T){_t.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),fe.setValue(k,"projectionMatrix",T.projectionMatrix),fe.setValue(k,"viewMatrix",T.matrixWorldInverse);let pn=fe.map.cameraPosition;pn!==void 0&&pn.setValue(k,Je.setFromMatrixPosition(T.matrixWorld)),Wt.logarithmicDepthBuffer&&fe.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&fe.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),C!==T&&(C=T,Hs=!0,Ar=!0)}if(Ut.needsLights&&(Gn.state.sunShadowMap.length>0&&fe.setValue(k,"sunShadowMap",Gn.state.sunShadowMap,kt),Gn.state.directionalShadowMap.length>0&&fe.setValue(k,"directionalShadowMap",Gn.state.directionalShadowMap,kt),Gn.state.spotShadowMap.length>0&&fe.setValue(k,"spotShadowMap",Gn.state.spotShadowMap,kt),Gn.state.pointShadowMap.length>0&&fe.setValue(k,"pointShadowMap",Gn.state.pointShadowMap,kt)),Z.isSkinnedMesh){fe.setOptional(k,Z,"bindMatrix"),fe.setOptional(k,Z,"bindMatrixInverse");let Fe=Z.skeleton;Fe&&(Fe.boneTexture===null&&Fe.computeBoneTexture(),fe.setValue(k,"boneTexture",Fe.boneTexture,kt))}Z.isBatchedMesh&&(fe.setOptional(k,Z,"batchingTexture"),fe.setValue(k,"batchingTexture",Z._matricesTexture,kt),fe.setOptional(k,Z,"batchingIdTexture"),fe.setValue(k,"batchingIdTexture",Z._indirectTexture,kt),fe.setOptional(k,Z,"batchingColorTexture"),Z._colorsTexture!==null&&fe.setValue(k,"batchingColorTexture",Z._colorsTexture,kt));let Gi=J.morphAttributes;if((Gi.position!==void 0||Gi.normal!==void 0||Gi.color!==void 0)&&et.update(Z,J,Rn),(Hs||Ut.receiveShadow!==Z.receiveShadow)&&(Ut.receiveShadow=Z.receiveShadow,fe.setValue(k,"receiveShadow",Z.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&U.environment!==null&&(yn.envMapIntensity.value=U.environmentIntensity),yn.dfgLUT!==void 0&&(yn.dfgLUT.value=J1()),Hs){if(fe.setValue(k,"toneMappingExposure",A.toneMappingExposure),Ut.needsLights&&ya(yn,Ar),Tt&&X.fog===!0&&mt.refreshFogUniforms(yn,Tt),mt.refreshMaterialUniforms(yn,X,lt,bt,b.state.transmissionRenderTarget[T.id]),Ut.needsLights&&Ut.numLightProbeGrids>0){let Fe=y,pn=0;for(let vs of b.state.lightProbeGridArray)vs.texture!==null&&(Fe.textures[pn]=vs.texture,Fe.min[pn]=vs.boundingBox.min,Fe.max[pn]=vs.boundingBox.max,Fe.resolution[pn]=vs.resolution,pn++);for(let vs in Fe)Fe[vs].length=pn;yn.probesSH.value=Fe.textures,yn.probesMin.value=Fe.min,yn.probesMax.value=Fe.max,yn.probesResolution.value=Fe.resolution}qo.upload(k,an(Ut),yn,kt)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(qo.upload(k,an(Ut),yn,kt),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&fe.setValue(k,"center",Z.center),fe.setValue(k,"modelViewMatrix",Z.modelViewMatrix),fe.setValue(k,"normalMatrix",Z.normalMatrix),fe.setValue(k,"modelMatrix",Z.matrixWorld),X.uniformsGroups!==void 0){let Fe=X.uniformsGroups;for(let pn=0,vs=Fe.length;pn<vs;pn++){let zp=Fe[pn];dt.update(zp,Rn),dt.bind(zp,Rn)}}return Rn}function ya(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.sunLights.needsUpdate=U,T.sunLightShadows.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function Kl(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(T,U,J){let X=Ft.get(T);X.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Ft.get(T.texture).__webglTexture=U,Ft.get(T.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,U){let J=Ft.get(T);J.__webglFramebuffer=U,J.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,J=0){$=T,G=U,O=J;let X=null,Z=!1,Tt=!1;if(T){let wt=Ft.get(T);if(wt.__useDefaultFramebuffer!==void 0){_t.bindFramebuffer(k.FRAMEBUFFER,wt.__webglFramebuffer),K.copy(T.viewport),gt.copy(T.scissor),j=T.scissorTest,_t.viewport(K),_t.scissor(gt),_t.setScissorTest(j),V=-1;return}else if(wt.__webglFramebuffer===void 0)kt.setupRenderTarget(T);else if(wt.__hasExternalTextures)kt.rebindTextures(T,Ft.get(T.texture).__webglTexture,Ft.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Zt=T.depthTexture;if(wt.__boundDepthTexture!==Zt){if(Zt!==null&&Ft.has(Zt)&&(T.width!==Zt.image.width||T.height!==Zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(T)}}let Rt=T.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Tt=!0);let Bt=Ft.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Bt[U])?X=Bt[U][J]:X=Bt[U],Z=!0):T.samples>0&&kt.useMultisampledRTT(T)===!1?X=Ft.get(T).__webglMultisampledFramebuffer:Array.isArray(Bt)?X=Bt[J]:X=Bt,K.copy(T.viewport),gt.copy(T.scissor),j=T.scissorTest}else K.copy(Pt).multiplyScalar(lt).floor(),gt.copy(Ht).multiplyScalar(lt).floor(),j=It;if(J!==0&&(X=F),_t.bindFramebuffer(k.FRAMEBUFFER,X)&&_t.drawBuffers(T,X),_t.viewport(K),_t.scissor(gt),_t.setScissorTest(j),Z){let wt=Ft.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+U,wt.__webglTexture,J)}else if(Tt){let wt=U;for(let Rt=0;Rt<T.textures.length;Rt++){let Bt=Ft.get(T.textures[Rt]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Rt,Bt.__webglTexture,J,wt)}}else if(T!==null&&J!==0){let wt=Ft.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,wt.__webglTexture,J)}V=-1};function Gs(T){let U=Ft.get(T);return(U.__readFormat!==T.format||U.__readType!==T.type)&&(U.__readFormat=T.format,U.__readType=T.type,U.__formatReadable=Wt.textureFormatReadable(T.format),U.__typeReadable=Wt.textureTypeReadable(T.type)),U}this.readRenderTargetPixels=function(T,U,J,X,Z,Tt,Dt,wt=0){if(!(T&&T.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=Ft.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Dt!==void 0&&(Rt=Rt[Dt],Array.isArray(Rt)&&(Rt=Rt[0])),Rt){_t.bindFramebuffer(k.FRAMEBUFFER,Rt);try{let Bt=T.textures[wt],Zt=Bt.format,oe=Bt.type;T.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+wt);let Nt=Gs(Bt);if(Nt.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Nt.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-X&&J>=0&&J<=T.height-Z&&k.readPixels(U,J,X,Z,ft.convert(Zt),ft.convert(oe),Tt)}finally{let Bt=$!==null?Ft.get($).__webglFramebuffer:null;_t.bindFramebuffer(k.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(T,U,J,X,Z,Tt,Dt,wt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=Ft.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Dt!==void 0&&(Rt=Rt[Dt],Array.isArray(Rt)&&(Rt=Rt[0])),Rt)if(U>=0&&U<=T.width-X&&J>=0&&J<=T.height-Z){_t.bindFramebuffer(k.FRAMEBUFFER,Rt);let Bt=T.textures[wt],Zt=Bt.format,oe=Bt.type;T.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+wt);let Nt=Gs(Bt);if(Nt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Nt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ae=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,ae),k.bufferData(k.PIXEL_PACK_BUFFER,Tt.byteLength,k.STREAM_READ),k.readPixels(U,J,X,Z,ft.convert(Zt),ft.convert(oe),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let je=$!==null?Ft.get($).__webglFramebuffer:null;_t.bindFramebuffer(k.FRAMEBUFFER,je);let Ce=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await $m(k,Ce,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,ae),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Tt),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(ae),k.deleteSync(Ce),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,U=null,J=0){let X=Math.pow(2,-J),Z=Math.floor(T.image.width*X),Tt=Math.floor(T.image.height*X),Dt=U!==null?U.x:0,wt=U!==null?U.y:0;kt.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,J,0,0,Dt,wt,Z,Tt),_t.unbindTexture()},this.copyTextureToTexture=function(T,U,J=null,X=null,Z=0,Tt=0){let Dt,wt,Rt,Bt,Zt,oe,Nt,ae,je,Ce=T.isCompressedTexture?T.mipmaps[Tt]:T.image;if(J!==null)Dt=J.max.x-J.min.x,wt=J.max.y-J.min.y,Rt=J.isBox3?J.max.z-J.min.z:1,Bt=J.min.x,Zt=J.min.y,oe=J.isBox3?J.min.z:0;else{let fe=Math.pow(2,-Z);Dt=Math.floor(Ce.width*fe),wt=Math.floor(Ce.height*fe),T.isDataArrayTexture?Rt=Ce.depth:T.isData3DTexture?Rt=Math.floor(Ce.depth*fe):Rt=1,Bt=0,Zt=0,oe=0}X!==null?(Nt=X.x,ae=X.y,je=X.z):(Nt=0,ae=0,je=0);let Ae=ft.convert(U.format),An=ft.convert(U.type),Ut;U.isData3DTexture?(kt.setTexture3D(U,0),Ut=k.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(kt.setTexture2DArray(U,0),Ut=k.TEXTURE_2D_ARRAY):(kt.setTexture2D(U,0),Ut=k.TEXTURE_2D),_t.activeTexture(k.TEXTURE0),_t.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,U.flipY),_t.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),_t.pixelStorei(k.UNPACK_ALIGNMENT,U.unpackAlignment);let Gn=_t.getParameter(k.UNPACK_ROW_LENGTH),xe=_t.getParameter(k.UNPACK_IMAGE_HEIGHT),Er=_t.getParameter(k.UNPACK_SKIP_PIXELS),Rn=_t.getParameter(k.UNPACK_SKIP_ROWS),Ql=_t.getParameter(k.UNPACK_SKIP_IMAGES);_t.pixelStorei(k.UNPACK_ROW_LENGTH,Ce.width),_t.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ce.height),_t.pixelStorei(k.UNPACK_SKIP_PIXELS,Bt),_t.pixelStorei(k.UNPACK_SKIP_ROWS,Zt),_t.pixelStorei(k.UNPACK_SKIP_IMAGES,oe);let Hs=T.isDataArrayTexture||T.isData3DTexture,Ar=U.isDataArrayTexture||U.isData3DTexture;if(T.isDepthTexture){let fe=Ft.get(T),yn=Ft.get(U),Gi=Ft.get(fe.__renderTarget),Fe=Ft.get(yn.__renderTarget);_t.bindFramebuffer(k.READ_FRAMEBUFFER,Gi.__webglFramebuffer),_t.bindFramebuffer(k.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let pn=0;pn<Rt;pn++)Hs&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ft.get(T).__webglTexture,Z,oe+pn),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ft.get(U).__webglTexture,Tt,je+pn)),k.blitFramebuffer(Bt,Zt,Bt+Dt,Zt+wt,Nt,ae,Nt+Dt,ae+wt,k.DEPTH_BUFFER_BIT,k.NEAREST);_t.bindFramebuffer(k.READ_FRAMEBUFFER,null),_t.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(Z!==0||T.isRenderTargetTexture||Ft.has(T)){let fe=Ft.get(T),yn=Ft.get(U);_t.bindFramebuffer(k.READ_FRAMEBUFFER,L),_t.bindFramebuffer(k.DRAW_FRAMEBUFFER,B);for(let Gi=0;Gi<Rt;Gi++)Hs?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,fe.__webglTexture,Z,oe+Gi):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,fe.__webglTexture,Z),Ar?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,yn.__webglTexture,Tt,je+Gi):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,yn.__webglTexture,Tt),Z!==0?k.blitFramebuffer(Bt,Zt,Bt+Dt,Zt+wt,Nt,ae,Nt+Dt,ae+wt,k.COLOR_BUFFER_BIT,k.NEAREST):Ar?k.copyTexSubImage3D(Ut,Tt,Nt,ae,je+Gi,Bt,Zt,Dt,wt):k.copyTexSubImage2D(Ut,Tt,Nt,ae,Bt,Zt,Dt,wt);_t.bindFramebuffer(k.READ_FRAMEBUFFER,null),_t.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Ar?T.isDataTexture||T.isData3DTexture?k.texSubImage3D(Ut,Tt,Nt,ae,je,Dt,wt,Rt,Ae,An,Ce.data):U.isCompressedArrayTexture?k.compressedTexSubImage3D(Ut,Tt,Nt,ae,je,Dt,wt,Rt,Ae,Ce.data):k.texSubImage3D(Ut,Tt,Nt,ae,je,Dt,wt,Rt,Ae,An,Ce):T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Tt,Nt,ae,Dt,wt,Ae,An,Ce.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Tt,Nt,ae,Ce.width,Ce.height,Ae,Ce.data):k.texSubImage2D(k.TEXTURE_2D,Tt,Nt,ae,Dt,wt,Ae,An,Ce);_t.pixelStorei(k.UNPACK_ROW_LENGTH,Gn),_t.pixelStorei(k.UNPACK_IMAGE_HEIGHT,xe),_t.pixelStorei(k.UNPACK_SKIP_PIXELS,Er),_t.pixelStorei(k.UNPACK_SKIP_ROWS,Rn),_t.pixelStorei(k.UNPACK_SKIP_IMAGES,Ql),Tt===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&k.generateMipmap(Ut),_t.unbindTexture()},this.initRenderTarget=function(T){Ft.get(T).__webglFramebuffer===void 0&&kt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?kt.setTextureCube(T,0):T.isData3DTexture?kt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?kt.setTexture2DArray(T,0):kt.setTexture2D(T,0),_t.unbindTexture()},this.resetState=function(){G=0,O=0,$=null,_t.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}};function Ps(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Vg(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var ii={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ml={duration:.5,overwrite:!1,delay:0},Rf,bn,Ue,Ui=1e8,be=1/Ui,yf=Math.PI*2,K1=yf/4,Q1=0,Wg=Math.sqrt,j1=Math.cos,tb=Math.sin,un=function(t){return typeof t=="string"},Xe=function(t){return typeof t=="function"},Ls=function(t){return typeof t=="number"},nu=function(t){return typeof t>"u"},us=function(t){return typeof t=="object"},ni=function(t){return t!==!1},Cf=function(){return typeof window<"u"},Xh=function(t){return Xe(t)||un(t)},Xg=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Un=Array.isArray,eb=/random\([^)]+\)/g,nb=/,\s*/g,Ug=/(?:-?\.?\d|\.)+/gi,Pf=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Vr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ff=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,If=/[+-]=-?[.\d]+/,ib=/[^,'"\[\]\s]+/gi,sb=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ze,cs,Sf,Lf,gi={},$h={},qg,Yg=function(t){return($h=Jo(t,gi))&&On},iu=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},gl=function(t,e){return!e&&console.warn(t)},Zg=function(t,e){return t&&(gi[t]=e)&&$h&&($h[t]=e)||gi},_l=function(){return 0},rb={suppressEvents:!0,isStart:!0,kill:!1},qh={suppressEvents:!0,kill:!1},ob={suppressEvents:!0},Df={},or=[],Mf={},$g,ti={},pf={},Og=30,Yh=[],Nf="",Uf=function(t){var e=t[0],n,i;if(us(e)||Xe(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Yh.length;i--&&!Yh[i].targetTest(e););n=Yh[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new zf(t[i],n)))||t.splice(i,1);return t},ar=function(t){return t._gsap||Uf(Oi(t))[0]._gsap},Of=function(t,e,n){return(n=t[e])&&Xe(n)?t[e]():nu(n)&&t.getAttribute&&t.getAttribute(e)||n},Wn=function(t,e){return(t=t.split(",")).forEach(e)||t},qe=function(t){return Math.round(t*1e5)/1e5||0},Be=function(t){return Math.round(t*1e7)/1e7||0},Wr=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},ab=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Jh=function(){var t=or.length,e=or.slice(0),n,i;for(Mf={},or.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Ff=function(t){return!!(t._initted||t._startAt||t.add)},Jg=function(t,e,n,i){or.length&&!bn&&Jh(),t.render(e,n,i||!!(bn&&e<0&&Ff(t))),or.length&&!bn&&Jh()},Kg=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(ib).length<2?e:un(t)?t.trim():t},Qg=function(t){return t},_i=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},lb=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Jo=function(t,e){for(var n in e)t[n]=e[n];return t},Fg=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=us(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},Kh=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},dl=function(t){var e=t.parent||ze,n=t.keyframes?lb(Un(t.keyframes)):_i;if(ni(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},cb=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},jg=function(t,e,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t[i],a;if(r)for(a=e[r];o&&o[r]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},su=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,o=e._next;r?r._next=o:t[n]===e&&(t[n]=o),o?o._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},lr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},kr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},hb=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},bf=function(t,e,n,i){return t._startAt&&(bn?t._startAt.revert(qh):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},ub=function s(t){return!t||t._ts&&s(t.parent)},Bg=function(t){return t._repeat?Ko(t._tTime,t=t.duration()+t._rDelay)*t:0},Ko=function(t,e){var n=Math.floor(t=Be(t/e));return t&&n===t?n-1:n},Qh=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},ru=function(t){return t._end=Be(t._start+(t._tDur/Math.abs(t._ts||t._rts||be)||0))},ou=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Be(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),ru(t),n._dirty||kr(n,t)),t},t0=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Qh(t.rawTime(),e),(!e._dur||Sl(0,e.totalDuration(),n)-e._tTime>be)&&e.render(n,!0)),kr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-be}},hs=function(t,e,n,i){return e.parent&&lr(e),e._start=Be((Ls(n)?n:!n&&jh(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==ze?Ni(t,n,e):t._time)+e._delay),e._end=Be(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),jg(t,e,"_first","_last",t._sort?"_start":0),jh(e)||(t._recent=e),i||t0(t,e),t._ts<0&&ou(t,t._tTime),t},e0=function(t,e){return(gi.ScrollTrigger||iu("scrollTrigger",e))&&gi.ScrollTrigger.create(e,t)},n0=function(t,e,n,i,r){if(Hf(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!bn&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&$g!==ei.frame)return or.push(t),t._lazy=[r,i],1},db=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},jh=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},fb=function(t,e,n,i){var r=t.ratio,o=e<0||!e&&(!t._start&&db(t)&&!(!t._initted&&jh(t))||(t._ts<0||t._dp._ts<0)&&!jh(t))?0:1,a=t._rDelay,l=0,c,h,f;if(a&&t._repeat&&(l=Sl(0,t._tDur,e),h=Ko(l,a),t._yoyo&&h&1&&(o=1-o),h!==Ko(t._tTime,a)&&(r=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==r||bn||i||t._zTime===be||!e&&t._zTime){if(!t._initted&&n0(t,e,i,n,l))return;for(f=t._zTime,t._zTime=e||(n?be:0),n||(n=e&&!f),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&bf(t,e,n,!0),t._onUpdate&&!n&&mi(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&mi(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&lr(t,1),!n&&!bn&&(mi(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},pb=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Qo=function(t,e,n,i){var r=t._repeat,o=Be(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=r?r<0?1e10:Be(o*(r+1)+t._rDelay*r):o,a>0&&!i&&ou(t,t._tTime=t._tDur*a),t.parent&&ru(t),n||kr(t.parent,t),t},zg=function(t){return t instanceof Nn?kr(t):Qo(t,t._dur)},mb={_start:0,endTime:_l,totalDuration:_l},Ni=function s(t,e,n){var i=t.labels,r=t._recent||mb,o=t.duration()>=Ui?r.endTime(!1):t._dur,a,l,c;return un(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?r:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(Un(n)?n[0]:n).totalDuration()),a>1?s(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},fl=function(t,e,n){var i=Ls(e[1]),r=(i?2:1)+(t<2?0:1),o=e[r],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=ni(l.vars.inherit)&&l.parent;o.immediateRender=ni(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[r-1]}return new $e(e[0],o,e[r+1])},cr=function(t,e){return t||t===0?e(t):e},Sl=function(t,e,n){return n<t?t:n>e?e:n},wn=function(t,e){return!un(t)||!(e=sb.exec(t))?"":e[1]},gb=function(t,e,n){return cr(n,function(i){return Sl(t,e,i)})},wf=[].slice,i0=function(t,e){return t&&us(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&us(t[0]))&&!t.nodeType&&t!==cs},_b=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return un(i)&&!e||i0(i,1)?(r=n).push.apply(r,Oi(i)):n.push(i)})||n},Oi=function(t,e,n){return Ue&&!e&&Ue.selector?Ue.selector(t):un(t)&&!n&&(Sf||!jo())?wf.call((e||Lf).querySelectorAll(t),0):Un(t)?_b(t,n):i0(t)?wf.call(t,0):t?[t]:[]},Tf=function(t){return t=Oi(t)[0]||gl("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Oi(e,n.querySelectorAll?n:n===t?gl("Invalid scope")||Lf.createElement("div"):t)}},s0=function(t){return t.sort(function(){return .5-Math.random()})},r0=function(t){if(Xe(t))return t;var e=us(t)?t:{each:t},n=Gr(e.ease),i=e.from||0,r=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,f=i;return un(i)?h=f={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],f=i[1]),function(u,d,p){var _=(p||e).length,m=o[_],g,v,E,y,M,b,x,S,R;if(!m){if(R=e.grid==="auto"?0:(e.grid||[1,Ui])[1],!R){for(x=-Ui;x<(x=p[R++].getBoundingClientRect().left)&&R<_;);R<_&&R--}for(m=o[_]=[],g=l?Math.min(R,_)*h-.5:i%R,v=R===Ui?0:l?_*f/R-.5:i/R|0,x=0,S=Ui,b=0;b<_;b++)E=b%R-g,y=v-(b/R|0),m[b]=M=c?Math.abs(c==="y"?y:E):Wg(E*E+y*y),M>x&&(x=M),M<S&&(S=M);i==="random"&&s0(m),m.max=x-S,m.min=S,m.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(R>_?_-1:c?c==="y"?_/R:R:Math.max(R,_/R))||0)*(i==="edges"?-1:1),m.b=_<0?r-_:r,m.u=wn(e.amount||e.each)||0,n=n&&_<0?Pb(n):n}return _=(m[u]-m.min)/m.max||0,Be(m.b+(n?n(_):_)*m.v)+m.u}},Ef=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Be(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Ls(n)?0:wn(n))}},o0=function(t,e){var n=Un(t),i,r;return!n&&us(t)&&(i=n=t.radius||Ui,t.values?(t=Oi(t.values),(r=!Ls(t[0]))&&(i*=i)):t=Ef(t.increment)),cr(e,n?Xe(t)?function(o){return r=t(o),Math.abs(r-o)<=i?r:o}:function(o){for(var a=parseFloat(r?o.x:o),l=parseFloat(r?o.y:0),c=Ui,h=0,f=t.length,u,d;f--;)r?(u=t[f].x-a,d=t[f].y-l,u=u*u+d*d):u=Math.abs(t[f]-a),u<c&&(c=u,h=f);return h=!i||c<=i?t[h]:o,r||h===o||Ls(o)?h:h+wn(o)}:Ef(t))},a0=function(t,e,n,i){return cr(Un(t)?!e:n===!0?!!(n=0):!i,function(){return Un(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},xb=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,o){return o(r)},i)}},vb=function(t,e){return function(n){return t(parseFloat(n))+(e||wn(n))}},yb=function(t,e,n){return c0(t,e,0,1,n)},l0=function(t,e,n){return cr(n,function(i){return t[~~e(i)]})},Sb=function s(t,e,n){var i=e-t;return Un(t)?l0(t,s(0,t.length),e):cr(n,function(r){return(i+(r-t)%i)%i+t})},Mb=function s(t,e,n){var i=e-t,r=i*2;return Un(t)?l0(t,s(0,t.length-1),e):cr(n,function(o){return o=(r+(o-t)%r)%r||0,t+(o>i?r-o:o)})},ta=function(t){return t.replace(eb,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(nb);return a0(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},c0=function(t,e,n,i,r){var o=e-t,a=i-n;return cr(r,function(l){return n+((l-t)/o*a||0)})},bb=function s(t,e,n,i){var r=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!r){var o=un(t),a={},l,c,h,f,u;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(Un(t)&&!Un(e)){for(h=[],f=t.length,u=f-2,c=1;c<f;c++)h.push(s(t[c-1],t[c]));f--,r=function(p){p*=f;var _=Math.min(u,~~p);return h[_](p-_)},n=e}else i||(t=Jo(Un(t)?[]:{},t));if(!h){for(l in e)kf.call(a,t,l,"get",e[l]);r=function(p){return Xf(p,a)||(o?t.p:t)}}}return cr(n,r)},kg=function(t,e,n){var i=t.labels,r=Ui,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&r>(a=Math.abs(a))&&(l=o,r=a);return l},mi=function(t,e,n){var i=t.vars,r=i[e],o=Ue,a=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&or.length&&Jh(),a&&(Ue=a),h=l?r.apply(c,l):r.call(c),Ue=o,h},hl=function(t){return lr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!bn),t.progress()<1&&mi(t,"onInterrupt"),t},$o,h0=[],u0=function(t){if(t)if(t=!t.name&&t.default||t,Cf()||t.headless){var e=t.name,n=Xe(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:_l,render:Xf,add:kf,kill:kb,modifier:zb,rawVars:0},o={targetTest:0,get:0,getSetter:au,aliases:{},register:0};if(jo(),t!==i){if(ti[e])return;_i(i,_i(Kh(t,r),o)),Jo(i.prototype,Jo(r,Kh(t,o))),ti[i.prop=e]=i,t.targetTest&&(Yh.push(i),Df[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Zg(e,i),t.register&&t.register(On,i,Xn)}else h0.push(t)},Re=255,ul={aqua:[0,Re,Re],lime:[0,Re,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Re],navy:[0,0,128],white:[Re,Re,Re],olive:[128,128,0],yellow:[Re,Re,0],orange:[Re,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Re,0,0],pink:[Re,192,203],cyan:[0,Re,Re],transparent:[Re,Re,Re,0]},mf=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Re+.5|0},d0=function(t,e,n){var i=t?Ls(t)?[t>>16,t>>8&Re,t&Re]:0:ul.black,r,o,a,l,c,h,f,u,d,p;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),ul[t])i=ul[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+r+r+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Re,i&Re,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Re,t&Re]}else if(t.substr(0,3)==="hsl"){if(i=p=t.match(Ug),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,r=h*2-o,i.length>3&&(i[3]*=1),i[0]=mf(l+1/3,r,o),i[1]=mf(l,r,o),i[2]=mf(l-1/3,r,o);else if(~t.indexOf("="))return i=t.match(Pf),n&&i.length<4&&(i[3]=1),i}else i=t.match(Ug)||ul.transparent;i=i.map(Number)}return e&&!p&&(r=i[0]/Re,o=i[1]/Re,a=i[2]/Re,f=Math.max(r,o,a),u=Math.min(r,o,a),h=(f+u)/2,f===u?l=c=0:(d=f-u,c=h>.5?d/(2-f-u):d/(f+u),l=f===r?(o-a)/d+(o<a?6:0):f===o?(a-r)/d+2:(r-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},f0=function(t){var e=[],n=[],i=-1;return t.split(Is).forEach(function(r){var o=r.match(Vr)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Gg=function(t,e,n){var i="",r=(t+i).match(Is),o=e?"hsla(":"rgba(",a=0,l,c,h,f;if(!r)return t;if(r=r.map(function(u){return(u=d0(u,e,1))&&o+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=f0(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Is,"1").split(Vr),f=c.length-1;a<f;a++)i+=c[a]+(~l.indexOf(a)?r.shift()||o+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(Is),f=c.length-1;a<f;a++)i+=c[a]+r[a];return i+c[f]},Is=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in ul)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),wb=/hsl[a]?\(/,Bf=function(t){var e=t.join(" "),n;if(Is.lastIndex=0,Is.test(e))return n=wb.test(e),t[1]=Gg(t[1],n),t[0]=Gg(t[0],n,f0(t[1])),!0},xl,ei=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,o=r,a=[],l,c,h,f,u,d,p=function _(m){var g=s()-i,v=m===!0,E,y,M,b;if((g>t||g<0)&&(n+=g-e),i+=g,M=i-n,E=M-o,(E>0||v)&&(b=++f.frame,u=M-f.time*1e3,f.time=M=M/1e3,o+=E+(E>=r?0:r-E),y=1),v||(l=c(_)),y)for(d=0;d<a.length;d++)a[d](M,u,b,m)};return f={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return u/(1e3/(m||60))},wake:function(){qg&&(!Sf&&Cf()&&(cs=Sf=window,Lf=cs.document||{},gi.gsap=On,(cs.gsapVersions||(cs.gsapVersions=[])).push(On.version),Yg($h||cs.GreenSockGlobals||!cs.gsap&&cs||{}),h0.forEach(u0)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=h||function(m){return setTimeout(m,o-f.time*1e3+1|0)},xl=1,p(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),xl=0,c=_l},lagSmoothing:function(m,g){t=m||1/0,e=Math.min(g||33,t)},fps:function(m){r=1e3/(m||240),o=f.time*1e3+r},add:function(m,g,v){var E=g?function(y,M,b,x){m(y,M,b,x),f.remove(E)}:m;return f.remove(m),a[v?"unshift":"push"](E),jo(),E},remove:function(m,g){~(g=a.indexOf(m))&&a.splice(g,1)&&d>=g&&d--},_listeners:a},f})(),jo=function(){return!xl&&ei.wake()},he={},Tb=/^[\d.\-M][\d.\-,\s]/,Eb=/["']/g,Ab=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,o=n.length,a,l,c;r<o;r++)l=n[r],a=r!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(Eb,"").trim():+c,i=l.substr(a+1).trim();return e},Rb=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Cb=function(t){var e=(t+"").split("("),n=he[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Ab(e[1])]:Rb(t).split(",").map(Kg)):he._CE&&Tb.test(t)?he._CE("",t):n},Pb=function(t){return function(e){return 1-t(1-e)}},Gr=function(t,e){return t&&(Xe(t)?t:he[t]||Cb(t))||e},Xr=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},o;return Wn(t,function(a){he[a]=gi[a]=r,he[o=a.toLowerCase()]=n;for(var l in r)he[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=he[a+"."+l]=r[l]}),r},p0=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},gf=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),o=r/yf*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*tb((h-o)*r)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:p0(a);return r=yf/r,l.config=function(c,h){return s(t,c,h)},l},_f=function s(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:p0(n);return i.config=function(r){return s(t,r)},i};Wn("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Xr(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});he.Linear.easeNone=he.none=he.Linear.easeIn;Xr("Elastic",gf("in"),gf("out"),gf());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(a){return a<e?s*a*a:a<n?s*Math.pow(a-1.5/t,2)+.75:a<i?s*(a-=2.25/t)*a+.9375:s*Math.pow(a-2.625/t,2)+.984375};Xr("Bounce",function(o){return 1-r(1-o)},r)})(7.5625,2.75);Xr("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Xr("Circ",function(s){return-(Wg(1-s*s)-1)});Xr("Sine",function(s){return s===1?1:-j1(s*K1)+1});Xr("Back",_f("in"),_f("out"),_f());he.SteppedEase=he.steps=gi.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,o=1-be;return function(a){return((i*Sl(0,o,a)|0)+r)*n}}};ml.ease=he["quad.out"];Wn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Nf+=s+","+s+"Params,"});var zf=function(t,e){this.id=Q1++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Of,this.set=e?e.getSetter:au},vl=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Qo(this,+e.duration,1,1),this.data=e.data,Ue&&(this._ctx=Ue,Ue.data.push(this)),xl||ei.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Qo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(jo(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(ou(this,n),!r._dp||r.parent||t0(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&hs(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===be||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Jg(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Bg(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Bg(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?Ko(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-be?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?Qh(this.parent._time,this):this._tTime,o=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-be?0:this._rts;var a=this.totalDuration();return(o!==this._rts<0||r>0&&r<a)&&this.totalTime(Sl(-Math.abs(this._delay),a,r),i!==!1),ru(this),hb(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{jo(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,r=this.progress()===1&&Math.abs(this._zTime)!==be,o;if(r)for(this._tTime-=be,o=this._first;o;){if(!o._dur&&o._zTime<0&&o._ts&&o._start<=i+be){r=!1;break}o=o._next}this.totalTime(i,r)}return this},t.startTime=function(n){if(arguments.length){this._start=Be(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&hs(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(ni(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Qh(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=ob);var i=bn;return bn=n,Ff(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),bn=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,zg(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,zg(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Ni(this,n),ni(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,ni(i)),this._dur||(this._zTime=-be),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-be:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-be,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-be)},t.eventCallback=function(n,i,r){var o=this.vars;return arguments.length>1?(i?(o[n]=i,r&&(o[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(o){var a=Xe(n)?n:Qg,l=function(){var h=i.then;i.then=null,r&&r(),Xe(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=h),o(a),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){hl(this)},s})();_i(vl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-be,_prom:0,_ps:!1,_rts:1});var Nn=(function(s){Vg(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=ni(n.sortChildren),ze&&hs(n.parent||ze,Ps(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&e0(Ps(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,o){return fl(0,arguments,this),this},e.from=function(i,r,o){return fl(1,arguments,this),this},e.fromTo=function(i,r,o,a){return fl(2,arguments,this),this},e.set=function(i,r,o){return r.duration=0,r.parent=this,dl(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new $e(i,r,Ni(this,o),1),this},e.call=function(i,r,o){return hs(this,$e.delayedCall(0,i,r),o)},e.staggerTo=function(i,r,o,a,l,c,h){return o.duration=r,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new $e(i,o,Ni(this,l)),this},e.staggerFrom=function(i,r,o,a,l,c,h){return o.runBackwards=1,dl(o).immediateRender=ni(o.immediateRender),this.staggerTo(i,r,o,a,l,c,h)},e.staggerFromTo=function(i,r,o,a,l,c,h,f){return a.startAt=o,dl(a).immediateRender=ni(a.immediateRender),this.staggerTo(i,r,a,l,c,h,f)},e.render=function(i,r,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Be(i),f=this._zTime<0!=i<0&&(this._initted||!c),u,d,p,_,m,g,v,E,y,M,b,x;if(this!==ze&&h>l&&i>=0&&(h=l),h!==this._tTime||o||f){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),u=h,y=this._start,E=this._ts,g=!E,f&&(c||(a=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,r,o);if(u=Be(h%m),h===l?(_=this._repeat,u=c):(M=Be(h/m),_=~~M,_&&_===M&&(u=c,_--),u>c&&(u=c)),M=Ko(this._tTime,m),!a&&this._tTime&&M!==_&&this._tTime-M*m-this._dur<=0&&(M=_),b&&_&1&&(u=c-u,x=1),_!==M&&!this._lock){var S=b&&M&1,R=S===(b&&_&1);if(_<M&&(S=!S),a=S?0:h%c?c:h,this._lock=1,this.render(a||(x?0:Be(_*m)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&mi(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,M=_),a&&a!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,R&&(this._lock=2,a=S?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=pb(this,Be(a),Be(u)),v&&(h-=u-(u=v._start))),this._tTime=h,this._time=u,this._act=!!E,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&c&&!r&&!M&&(mi(this,"onStart"),this._tTime!==h))return this;if(u>=a&&i>=0)for(d=this._first;d;){if(p=d._next,(d._act||u>=d._start)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,r,o);if(d.render(d._ts>0?(u-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(u-d._start)*d._ts,r,o),u!==this._time||!this._ts&&!g){v=0,p&&(h+=this._zTime=-be);break}}d=p}else{d=this._last;for(var A=i<0?i:u;d;){if(p=d._prev,(d._act||A<=d._end)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,r,o);if(d.render(d._ts>0?(A-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(A-d._start)*d._ts,r,o||bn&&Ff(d)),u!==this._time||!this._ts&&!g){v=0,p&&(h+=this._zTime=A?-be:be);break}}d=p}}if(v&&!r&&(this.pause(),v.render(u>=a?0:-be)._zTime=u>=a?1:-1,this._ts))return this._start=y,ru(this),this.render(i,r,o);this._onUpdate&&!r&&mi(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(y===this._start||Math.abs(E)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&lr(this,1),!r&&!(i<0&&!a)&&(h||a||!l)&&(mi(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var o=this;if(Ls(r)||(r=Ni(this,r,i)),!(i instanceof vl)){if(Un(i))return i.forEach(function(a){return o.add(a,r)}),this;if(un(i))return this.addLabel(i,r);if(Xe(i))i=$e.delayedCall(0,i);else return this}return this!==i?hs(this,i,r):this},e.getChildren=function(i,r,o,a){i===void 0&&(i=!0),r===void 0&&(r=!0),o===void 0&&(o=!0),a===void 0&&(a=-Ui);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof $e?r&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,o)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),o=r.length;o--;)if(r[o].vars.id===i)return r[o]},e.remove=function(i){return un(i)?this.removeLabel(i):Xe(i)?this.killTweensOf(i):(i.parent===this&&su(this,i),i===this._recent&&(this._recent=this._last),kr(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Be(ei.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=Ni(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,o){var a=$e.delayedCall(0,r||_l,o);return a.data="isPause",this._hasPause=1,hs(this,a,Ni(this,i))},e.removePause=function(i){var r=this._first;for(i=Ni(this,i);r;)r._start===i&&r.data==="isPause"&&lr(r),r=r._next},e.killTweensOf=function(i,r,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)rr!==a[l]&&a[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var o=[],a=Oi(i),l=this._first,c=Ls(r),h;l;)l instanceof $e?ab(l._targets,a)&&(c?(!rr||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&o.push(l):(h=l.getTweensOf(a,r)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,r){r=r||{};var o=this,a=Ni(o,i),l=r,c=l.startAt,h=l.onStart,f=l.onStartParams,u=l.immediateRender,d,p=$e.to(o,_i({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||be,onStart:function(){if(o.pause(),!d){var m=r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());p._dur!==m&&Qo(p,m,0,1).render(p._time,!0,!0),d=1}h&&h.apply(p,f||[])}},r));return u?p.render(0):p},e.tweenFromTo=function(i,r,o){return this.tweenTo(r,_i({startAt:{time:Ni(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),kg(this,Ni(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),kg(this,Ni(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+be)},e.shiftChildren=function(i,r,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=Be(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(r)for(c in l)l[c]>=o&&(l[c]+=i);return kr(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,o;r;)o=r._next,this.remove(r),r=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),kr(this)},e.totalDuration=function(i){var r=0,o=this,a=o._last,l=Ui,c,h,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,hs(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(r-=h,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=Be(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>r&&a._ts&&(r=a._end),a=c;Qo(o,o===ze&&o._time>r?o._time:r,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(ze._ts&&(Jg(ze,Qh(i,ze)),$g=ei.frame),ei.frame>=Og){Og+=ii.autoSleep||120;var r=ze._first;if((!r||!r._ts)&&ii.autoSleep&&ei._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||ei.sleep()}}},t})(vl);_i(Nn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Ib=function(t,e,n,i,r,o,a){var l=new Xn(this._pt,t,e,0,1,Wf,null,r),c=0,h=0,f,u,d,p,_,m,g,v;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=ta(i)),o&&(v=[n,i],o(v,t,e),n=v[0],i=v[1]),u=n.match(ff)||[];f=ff.exec(i);)p=f[0],_=i.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),p!==u[h++]&&(m=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:m,c:p.charAt(1)==="="?Wr(m,p)-m:parseFloat(p)-m,m:d&&d<4?Math.round:0},c=ff.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(If.test(i)||g)&&(l.e=0),this._pt=l,l},kf=function(t,e,n,i,r,o,a,l,c,h){Xe(i)&&(i=i(r||0,t,o));var f=t[e],u=n!=="get"?n:Xe(f)?c?t[e.indexOf("set")||!Xe(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,d=Xe(f)?c?Ob:g0:Vf,p;if(un(i)&&(~i.indexOf("random(")&&(i=ta(i)),i.charAt(1)==="="&&(p=Wr(u,i)+(wn(u)||0),(p||p===0)&&(i=p))),!h||u!==i||Af)return!isNaN(u*i)&&i!==""?(p=new Xn(this._pt,t,e,+u||0,i-(u||0),typeof f=="boolean"?Bb:_0,0,d),c&&(p.fp=c),a&&p.modifier(a,this,t),this._pt=p):(!f&&!(e in t)&&iu(e,i),Ib.call(this,t,e,u,i,d,l||ii.stringFilter,c))},Lb=function(t,e,n,i,r){if(Xe(t)&&(t=pl(t,r,e,n,i)),!us(t)||t.style&&t.nodeType||Un(t)||Xg(t))return un(t)?pl(t,r,e,n,i):t;var o={},a;for(a in t)o[a]=pl(t[a],r,e,n,i);return o},Gf=function(t,e,n,i,r,o){var a,l,c,h;if(ti[t]&&(a=new ti[t]).init(r,a.rawVars?e[t]:Lb(e[t],i,r,o,n),n,i,o)!==!1&&(n._pt=l=new Xn(n._pt,r,t,0,1,a.render,a,0,a.priority),n!==$o))for(c=n._ptLookup[n._targets.indexOf(r)],h=a._props.length;h--;)c[a._props[h]]=l;return a},rr,Af,Hf=function s(t,e,n){var i=t.vars,r=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,f=i.yoyoEase,u=i.keyframes,d=i.autoRevert,p=t._dur,_=t._startAt,m=t._targets,g=t.parent,v=g&&g.data==="nested"?g.vars.targets:m,E=t._overwrite==="auto"&&!Rf,y=t.timeline,M=i.easeReverse||f,b,x,S,R,A,D,I,F,L,B,G,O,$;if(y&&(!u||!r)&&(r="none"),t._ease=Gr(r,ml.ease),t._rEase=M&&(Gr(M)||t._ease),t._from=!y&&!!i.runBackwards,t._from&&(t.ratio=1),!y||u&&!i.stagger){if(F=m[0]?ar(m[0]).harness:0,O=F&&i[F.prop],b=Kh(i,Df),_&&(_._zTime<0&&_.progress(1),e<0&&h&&a&&!d?_.render(-1,!0):_.revert(h&&p?qh:rb),_._lazy=0),o){if(lr(t._startAt=$e.set(m,_i({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&ni(l),startAt:null,delay:0,onUpdate:c&&function(){return mi(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(bn||!a&&!d)&&t._startAt.revert(qh),a&&p&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&p&&!_){if(e&&(a=!1),S=_i({overwrite:!1,data:"isFromStart",lazy:a&&!_&&ni(l),immediateRender:a,stagger:0,parent:g},b),O&&(S[F.prop]=O),lr(t._startAt=$e.set(m,S)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(bn?t._startAt.revert(qh):t._startAt.render(-1,!0)),t._zTime=e,!a)s(t._startAt,be,be);else if(!e)return}for(t._pt=t._ptCache=0,l=p&&ni(l)||l&&!p,x=0;x<m.length;x++){if(A=m[x],I=A._gsap||Uf(m)[x]._gsap,t._ptLookup[x]=B={},Mf[I.id]&&or.length&&Jh(),G=v===m?x:v.indexOf(A),F&&(L=new F).init(A,O||b,t,G,v)!==!1&&(t._pt=R=new Xn(t._pt,A,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(V){B[V]=R}),L.priority&&(D=1)),!F||O)for(S in b)ti[S]&&(L=Gf(S,b,t,G,A,v))?L.priority&&(D=1):B[S]=R=kf.call(t,A,S,"get",b[S],G,v,0,i.stringFilter);t._op&&t._op[x]&&t.kill(A,t._op[x]),E&&t._pt&&(rr=t,ze.killTweensOf(A,B,t.globalTime(e)),$=!t.parent,rr=0),t._pt&&l&&(Mf[I.id]=1)}D&&qf(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!$,u&&e<=0&&y.render(Ui,!0,!0)},Db=function(t,e,n,i,r,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,f,u,d;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,d=t._targets.length;d--;){if(h=u[d][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Af=1,t.vars[e]="+=0",Hf(t,a),Af=0,l?gl(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(d=c.length;d--;)f=c[d],h=f._pt||f,h.s=(i||i===0)&&!r?i:h.s+(i||0)+o*h.c,h.c=n-h.s,f.e&&(f.e=qe(n)+wn(f.e)),f.b&&(f.b=h.s+wn(f.b))},Nb=function(t,e){var n=t[0]?ar(t[0]).harness:0,i=n&&n.aliases,r,o,a,l;if(!i)return e;r=Jo({},e);for(o in i)if(o in r)for(l=i[o].split(","),a=l.length;a--;)r[l[a]]=r[o];return r},Ub=function(t,e,n,i){var r=e.ease||i||"power1.inOut",o,a;if(Un(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:r})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:r})},pl=function(t,e,n,i,r){return Xe(t)?t.call(e,n,i,r):un(t)&&~t.indexOf("random(")?ta(t):t},tu=Nf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",m0={};Wn(tu+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return m0[s]=1});tu=tu.split(",");var $e=(function(s){Vg(t,s);function t(n,i,r,o){var a;typeof i=="number"&&(r.duration=i,i=r,r=null),a=s.call(this,o?i:dl(i))||this;var l=a.vars,c=l.duration,h=l.delay,f=l.immediateRender,u=l.stagger,d=l.overwrite,p=l.keyframes,_=l.defaults,m=l.scrollTrigger,g=i.parent||ze,v=(Un(n)||Xg(n)?Ls(n[0]):"length"in i)?[n]:Oi(n),E,y,M,b,x,S,R,A;if(a._targets=v.length?Uf(v):gl("GSAP target "+n+" not found. https://gsap.com",!ii.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,p||u||Xh(c)||Xh(h)){i=a.vars;var D=i.easeReverse||i.yoyoEase;if(E=a.timeline=new Nn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:v}),E.kill(),E.parent=E._dp=Ps(a),E._start=0,u||Xh(c)||Xh(h)){if(b=v.length,R=u&&r0(u),us(u))for(x in u)~tu.indexOf(x)&&(A||(A={}),A[x]=u[x]);for(y=0;y<b;y++)M=Kh(i,m0),M.stagger=0,D&&(M.easeReverse=D),A&&Jo(M,A),S=v[y],M.duration=+pl(c,Ps(a),y,S,v),M.delay=(+pl(h,Ps(a),y,S,v)||0)-a._delay,!u&&b===1&&M.delay&&(a._delay=h=M.delay,a._start+=h,M.delay=0),E.to(S,M,R?R(y,S,v):0),E._ease=he.none;E.duration()?c=h=0:a.timeline=0}else if(p){dl(_i(E.vars.defaults,{ease:"none"})),E._ease=Gr(p.ease||i.ease||"none");var I=0,F,L,B;if(Un(p))p.forEach(function(G){return E.to(v,G,">")}),E.duration();else{M={};for(x in p)x==="ease"||x==="easeEach"||Ub(x,p[x],M,p.easeEach);for(x in M)for(F=M[x].sort(function(G,O){return G.t-O.t}),I=0,y=0;y<F.length;y++)L=F[y],B={ease:L.e,duration:(L.t-(y?F[y-1].t:0))/100*c},B[x]=L.v,E.to(v,B,I),I+=B.duration;E.duration()<c&&E.to({},{duration:c-E.duration()})}}c||a.duration(c=E.duration())}else a.timeline=0;return d===!0&&!Rf&&(rr=Ps(a),ze.killTweensOf(v),rr=0),hs(g,Ps(a),r),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(f||!c&&!p&&a._start===Be(g._time)&&ni(f)&&ub(Ps(a))&&g.data!=="nested")&&(a._tTime=-be,a.render(Math.max(0,-h)||0)),m&&e0(Ps(a),m),a}var e=t.prototype;return e.render=function(i,r,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,f=i>l-be&&!h?l:i<be?0:i,u,d,p,_,m,g,v,E;if(!c)fb(this,i,r,o);else if(f!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=f,E=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,o);if(u=Be(f%_),f===l?(p=this._repeat,u=c):(m=Be(f/_),p=~~m,p&&p===m?(u=c,p--):u>c&&(u=c)),g=this._yoyo&&p&1,g&&(u=c-u),m=Ko(this._tTime,_),u===a&&!o&&this._initted&&p===m)return this._tTime=f,this;p!==m&&this.vars.repeatRefresh&&!g&&!this._lock&&u!==_&&this._initted&&(this._lock=o=1,this.render(Be(_*p),!0).invalidate()._lock=0)}if(!this._initted){if(n0(this,h?i:u,o,r,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&p!==m))return this;if(c!==this._dur)return this.render(i,r,o)}if(this._rEase){var y=u<a;if(y!==this._inv){var M=y?a:c-a;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=M?(y?-1:1)/M:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(u/c);if(this._from&&(this.ratio=v=1-v),this._tTime=f,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&f&&!r&&!m&&(mi(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(v,d.d),d=d._next;E&&E.render(i<0?i:E._dur*E._ease(u/this._dur),r,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&bf(this,i,r,o),mi(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!r&&this.parent&&mi(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&bf(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&lr(this,1),!r&&!(h&&!a)&&(f||a||g)&&(mi(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,o,a,l){xl||ei.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Hf(this,c),h=this._ease(c/this._dur),Db(this,i,r,o,a,h,c,l)?this.resetTo(i,r,o,a,1):(ou(this,0),this.parent||jg(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?hl(this):this.scrollTrigger&&this.scrollTrigger.kill(!!bn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,rr&&rr.vars.overwrite!==!0)._first||hl(this),this.parent&&o!==this.timeline.totalDuration()&&Qo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Oi(i):a,c=this._ptLookup,h=this._pt,f,u,d,p,_,m,g;if((!r||r==="all")&&cb(a,l))return r==="all"&&(this._pt=0),hl(this);for(f=this._op=this._op||[],r!=="all"&&(un(r)&&(_={},Wn(r,function(v){return _[v]=1}),r=_),r=Nb(a,r)),g=a.length;g--;)if(~l.indexOf(a[g])){u=c[g],r==="all"?(f[g]=r,p=u,d={}):(d=f[g]=f[g]||{},p=r);for(_ in p)m=u&&u[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&su(this,m,"_pt"),delete u[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&h&&hl(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return fl(1,arguments)},t.delayedCall=function(i,r,o,a){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,r,o){return fl(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,o){return ze.killTweensOf(i,r,o)},t})(vl);_i($e.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Wn("staggerTo,staggerFrom,staggerFromTo",function(s){$e[s]=function(){var t=new Nn,e=wf.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var Vf=function(t,e,n){return t[e]=n},g0=function(t,e,n){return t[e](n)},Ob=function(t,e,n,i){return t[e](i.fp,n)},Fb=function(t,e,n){return t.setAttribute(e,n)},au=function(t,e){return Xe(t[e])?g0:nu(t[e])&&t.setAttribute?Fb:Vf},_0=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Bb=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Wf=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Xf=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},zb=function(t,e,n,i){for(var r=this._pt,o;r;)o=r._next,r.p===i&&r.modifier(t,e,n),r=o},kb=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?su(this,e,"_pt"):e.dep||(n=1),e=i;return!n},Gb=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},qf=function(t){for(var e=t._pt,n,i,r,o;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=r},Xn=(function(){function s(e,n,i,r,o,a,l,c,h){this.t=n,this.s=r,this.c=o,this.p=i,this.r=a||_0,this.d=l||this,this.set=c||Vf,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=Gb,this.m=n,this.mt=r,this.tween=i},s})();Wn(Nf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Df[s]=1});gi.TweenMax=gi.TweenLite=$e;gi.TimelineLite=gi.TimelineMax=Nn;ze=new Nn({sortChildren:!1,defaults:ml,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});ii.stringFilter=Bf;var Hr=[],Zh={},Hb=[],Hg=0,Vb=0,xf=function(t){return(Zh[t]||Hb).map(function(e){return e()})},yl=function(){var t=Date.now(),e=[];t-Hg>2&&(xf("matchMediaInit"),Hr.forEach(function(n){var i=n.queries,r=n.conditions,o,a,l,c;for(a in i)o=cs.matchMedia(i[a]).matches,o&&(l=1),o!==r[a]&&(r[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),xf("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Hg=t,xf("matchMedia"))},x0=(function(){function s(e,n){this.selector=n&&Tf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Vb++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Xe(n)&&(r=i,i=n,n=Xe);var o=this,a=function(){var c=Ue,h=o.selector,f;return c&&c!==o&&c.data.push(o),r&&(o.selector=Tf(r)),Ue=o,f=i.apply(o,arguments),Xe(f)&&o._r.push(f),Ue=c,o.selector=h,o.isReverted=!1,f};return o.last=a,n===Xe?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Ue;Ue=null,n(this),Ue=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof $e&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var a=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof Nn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof $e)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i){for(var o=Hr.length;o--;)Hr[o].id===this.id&&Hr.splice(o,1);this._mqs&&this._mqs.forEach(function(a){return a.removeListener?a.removeListener(yl):a.removeEventListener("change",yl)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},s})(),Wb=(function(){function s(e){this.contexts=[],this.scope=e,Ue&&Ue.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){us(n)||(n={matches:n});var o=new x0(0,r||this.scope),a=o.conditions={},l,c,h;Ue&&!o.selector&&(o.selector=Ue.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=cs.matchMedia(n[c]),l&&(Hr.indexOf(o)<0&&Hr.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(yl):l.addEventListener("change",yl),(o._mqs||(o._mqs=[])).push(l)));return h&&i(o,function(f){return o.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),eu={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return u0(i)})},timeline:function(t){return new Nn(t)},getTweensOf:function(t,e){return ze.getTweensOf(t,e)},getProperty:function(t,e,n,i){un(t)&&(t=Oi(t)[0]);var r=ar(t||{}).get,o=n?Qg:Kg;return n==="native"&&(n=""),t&&(e?o((ti[e]&&ti[e].get||r)(t,e,n,i)):function(a,l,c){return o((ti[a]&&ti[a].get||r)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Oi(t),t.length>1){var i=t.map(function(h){return On.quickSetter(h,e,n)}),r=i.length;return function(h){for(var f=r;f--;)i[f](h)}}t=t[0]||{};var o=ti[e],a=ar(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var f=new o;$o._pt=0,f.init(t,n?h+n:h,$o,0,[t]),f.render(1,f),$o._pt&&Xf(1,$o)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,r=On.to(t,_i((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,h){return r.resetTo(e,l,c,h)};return o.tween=r,o},isTweening:function(t){return ze.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Gr(t.ease,ml.ease)),Fg(ml,t||{})},config:function(t){return Fg(ii,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!ti[a]&&!gi[a]&&gl(e+" effect requires "+a+" plugin.")}),pf[e]=function(a,l,c){return n(Oi(a),_i(l||{},r),c)},o&&(Nn.prototype[e]=function(a,l,c){return this.add(pf[e](a,us(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){he[t]=Gr(e)},parseEase:function(t,e){return arguments.length?Gr(t,e):he},getById:function(t){return ze.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Nn(t),i,r;for(n.smoothChildTiming=ni(t.smoothChildTiming),ze.remove(n),n._dp=0,n._time=n._tTime=ze._time,i=ze._first;i;)r=i._next,(e||!(!i._dur&&i instanceof $e&&i.vars.onComplete===i._targets[0]))&&hs(n,i,i._start-i._delay),i=r;return hs(ze,n,0),n},context:function(t,e){return t?new x0(t,e):Ue},matchMedia:function(t){return new Wb(t)},matchMediaRefresh:function(){return Hr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||yl()},addEventListener:function(t,e){var n=Zh[t]||(Zh[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Zh[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:Sb,wrapYoyo:Mb,distribute:r0,random:a0,snap:o0,normalize:yb,getUnit:wn,clamp:gb,splitColor:d0,toArray:Oi,selector:Tf,mapRange:c0,pipe:xb,unitize:vb,interpolate:bb,shuffle:s0},install:Yg,effects:pf,ticker:ei,updateRoot:Nn.updateRoot,plugins:ti,globalTimeline:ze,core:{PropTween:Xn,globals:Zg,Tween:$e,Timeline:Nn,Animation:vl,getCache:ar,_removeLinkedListItem:su,reverting:function(){return bn},context:function(t){return t&&Ue&&(Ue.data.push(t),t._ctx=Ue),Ue},suppressOverwrites:function(t){return Rf=t}}};Wn("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return eu[s]=$e[s]});ei.add(Nn.updateRoot);$o=eu.to({},{duration:0});var Xb=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},qb=function(t,e){var n=t._targets,i,r,o;for(i in e)for(r=n.length;r--;)o=t._ptLookup[r][i],o&&(o=o.d)&&(o._pt&&(o=Xb(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[r],i))},vf=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,o){o._onInit=function(a){var l,c;if(un(r)&&(l={},Wn(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}qb(a,r)}}}},On=eu.registerPlugin({name:"attr",init:function(t,e,n,i,r){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,r,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)bn?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},vf("roundProps",Ef),vf("modifiers"),vf("snap",o0))||eu;$e.version=Nn.version=On.version="3.15.1";qg=1;Cf()&&jo();var Yb=he.Power0,Zb=he.Power1,$b=he.Power2,Jb=he.Power3,Kb=he.Power4,Qb=he.Linear,jb=he.Quad,tw=he.Cubic,ew=he.Quart,nw=he.Quint,iw=he.Strong,sw=he.Elastic,rw=he.Back,ow=he.SteppedEase,aw=he.Bounce,lw=he.Sine,cw=he.Expo,hw=he.Circ;var v0,hr,na,Qf,$r,uw,y0,jf,dw=function(){return typeof window<"u"},Ns={},Zr=180/Math.PI,ia=Math.PI/180,ea=Math.atan2,S0=1e8,tp=/([A-Z])/g,fw=/(left|right|width|margin|padding|x)/i,pw=/[\s,\(]\S/,ds={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Zf=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},mw=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},gw=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},_w=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},xw=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},C0=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},P0=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},vw=function(t,e,n){return t.style[e]=n},yw=function(t,e,n){return t.style.setProperty(e,n)},Sw=function(t,e,n){return t._gsap[e]=n},Mw=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},bw=function(t,e,n,i,r){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(r,o)},ww=function(t,e,n,i,r){var o=t._gsap;o[e]=n,o.renderTransform(r,o)},ke="transform",si=ke+"Origin",Tw=function s(t,e){var n=this,i=this.target,r=i.style,o=i._gsap;if(t in Ns&&r){if(this.tfm=this.tfm||{},t!=="transform")t=ds[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Ds(i,a)}):this.tfm[t]=o.x?o[t]:Ds(i,t),t===si&&(this.tfm.zOrigin=o.zOrigin);else return ds.transform.split(",").forEach(function(a){return s.call(n,a,e)});if(this.props.indexOf(ke)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(si,e,"")),t=ke}(r||e)&&this.props.push(t,e,r[t])},I0=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},Ew=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,o;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(tp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=jf(),(!r||!r.isStart)&&!n[ke]&&(I0(n),i.zOrigin&&n[si]&&(n[si]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},L0=function(t,e){var n={target:t,props:[],revert:Ew,save:Tw};return t._gsap||On.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},D0,$f=function(t,e){var n=hr.createElementNS?hr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):hr.createElement(t);return n&&n.style?n:hr.createElement(t)},xi=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(tp,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,sa(e)||e,1)||""},M0="O,Moz,ms,Ms,Webkit".split(","),sa=function(t,e,n){var i=e||$r,r=i.style,o=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(M0[o]+t in r););return o<0?null:(o===3?"ms":o>=0?M0[o]:"")+t},Jf=function(){dw()&&window.document&&(v0=window,hr=v0.document,na=hr.documentElement,$r=$f("div")||{style:{}},uw=$f("div"),ke=sa(ke),si=ke+"Origin",$r.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",D0=!!sa("perspective"),jf=On.core.reverting,Qf=1)},b0=function(t){var e=t.ownerSVGElement,n=$f("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),na.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),na.removeChild(n),r},w0=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},N0=function(t){var e,n;try{e=t.getBBox()}catch{e=b0(t),n=1}return e&&(e.width||e.height)||n||(e=b0(t)),e&&!e.width&&!e.x&&!e.y?{x:+w0(t,["x","cx","x1"])||0,y:+w0(t,["y","cy","y1"])||0,width:0,height:0}:e},U0=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&N0(t))},dr=function(t,e){if(e){var n=t.style,i;e in Ns&&e!==si&&(e=ke),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(tp,"-$1").toLowerCase())):n.removeAttribute(e)}},ur=function(t,e,n,i,r,o){var a=new Xn(t._pt,e,n,0,1,o?P0:C0);return t._pt=a,a.b=i,a.e=r,t._props.push(n),a},T0={deg:1,rad:1,turn:1},Aw={grid:1,flex:1},fr=function s(t,e,n,i){var r=parseFloat(n)||0,o=(n+"").trim().substr((r+"").length)||"px",a=$r.style,l=fw.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),f=100,u=i==="px",d=i==="%",p,_,m,g;if(i===o||!r||T0[i]||T0[o])return r;if(o!=="px"&&!u&&(r=s(t,e,n,"px")),g=t.getCTM&&U0(t),(d||o==="%")&&(Ns[e]||~e.indexOf("adius")))return p=g?t.getBBox()[l?"width":"height"]:t[h],qe(d?r/p*f:r/100*p);if(a[l?"width":"height"]=f+(u?o:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===hr||!_.appendChild)&&(_=hr.body),m=_._gsap,m&&d&&m.width&&l&&m.time===ei.time&&!m.uncache)return qe(r/m.width*f);if(d&&(e==="height"||e==="width")){var v=t.style[e];t.style[e]=f+i,p=t[h],v?t.style[e]=v:dr(t,e)}else(d||o==="%")&&!Aw[xi(_,"display")]&&(a.position=xi(t,"position")),_===t&&(a.position="static"),_.appendChild($r),p=$r[h],_.removeChild($r),a.position="absolute";return l&&d&&(m=ar(_),m.time=ei.time,m.width=_[h]),qe(u?p*r/f:p&&r?f/p*r:0)},Ds=function(t,e,n,i){var r;return Qf||Jf(),e in ds&&e!=="transform"&&(e=ds[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ns[e]&&e!=="transform"?(r=wl(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:cu(xi(t,si))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=lu[e]&&lu[e](t,e,n)||xi(t,e)||Of(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?fr(t,e,r,n)+n:r},Rw=function(t,e,n,i){if(!n||n==="none"){var r=sa(e,t,1),o=r&&xi(t,r,1);o&&o!==n?(e=r,n=o):e==="borderColor"&&(n=xi(t,"borderTopColor"))}var a=new Xn(this._pt,t.style,e,0,1,Wf),l=0,c=0,h,f,u,d,p,_,m,g,v,E,y,M;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=xi(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=xi(t,e)||i,_?t.style[e]=_:dr(t,e)),h=[n,i],Bf(h),n=h[0],i=h[1],u=n.match(Vr)||[],M=i.match(Vr)||[],M.length){for(;f=Vr.exec(i);)m=f[0],v=i.substring(l,f.index),p?p=(p+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(p=1),m!==(_=u[c++]||"")&&(d=parseFloat(_)||0,y=_.substr((d+"").length),m.charAt(1)==="="&&(m=Wr(d,m)+y),g=parseFloat(m),E=m.substr((g+"").length),l=Vr.lastIndex-E.length,E||(E=E||ii.units[e]||y,l===i.length&&(i+=E,a.e+=E)),y!==E&&(d=fr(t,e,_,E)||0),a._pt={_next:a._pt,p:v||c===1?v:",",s:d,c:g-d,m:p&&p<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?P0:C0;return If.test(i)&&(a.e=0),this._pt=a,a},E0={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Cw=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=E0[n]||n,e[1]=E0[i]||i,e.join(" ")},Pw=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,o=n._gsap,a,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)a=r[c],Ns[a]&&(l=1,a=a==="transformOrigin"?si:ke),dr(n,a);l&&(dr(n,ke),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",wl(n,1),o.uncache=1,I0(i)))}},lu={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var o=t._pt=new Xn(t._pt,e,n,0,0,Pw);return o.u=i,o.pr=-10,o.tween=r,t._props.push(n),1}}},bl=[1,0,0,1,0,0],O0={},F0=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},A0=function(t){var e=xi(t,ke);return F0(e)?bl:e.substr(7).match(Pf).map(qe)},ep=function(t,e){var n=t._gsap||ar(t),i=t.style,r=A0(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?bl:r):(r===bl&&!t.offsetParent&&t!==na&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,na.appendChild(t)),r=A0(t),l?i.display=l:dr(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):na.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Kf=function(t,e,n,i,r,o){var a=t._gsap,l=r||ep(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,f=a.xOffset||0,u=a.yOffset||0,d=l[0],p=l[1],_=l[2],m=l[3],g=l[4],v=l[5],E=e.split(" "),y=parseFloat(E[0])||0,M=parseFloat(E[1])||0,b,x,S,R;n?l!==bl&&(x=d*m-p*_)&&(S=y*(m/x)+M*(-_/x)+(_*v-m*g)/x,R=y*(-p/x)+M*(d/x)-(d*v-p*g)/x,y=S,M=R):(b=N0(t),y=b.x+(~E[0].indexOf("%")?y/100*b.width:y),M=b.y+(~(E[1]||E[0]).indexOf("%")?M/100*b.height:M)),i||i!==!1&&a.smooth?(g=y-c,v=M-h,a.xOffset=f+(g*d+v*_)-g,a.yOffset=u+(g*p+v*m)-v):a.xOffset=a.yOffset=0,a.xOrigin=y,a.yOrigin=M,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[si]="0px 0px",o&&(ur(o,a,"xOrigin",c,y),ur(o,a,"yOrigin",h,M),ur(o,a,"xOffset",f,a.xOffset),ur(o,a,"yOffset",u,a.yOffset)),t.setAttribute("data-svg-origin",y+" "+M)},wl=function(t,e){var n=t._gsap||new zf(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=xi(t,si)||"0",h,f,u,d,p,_,m,g,v,E,y,M,b,x,S,R,A,D,I,F,L,B,G,O,$,V,C,K,gt,j,z,it;return h=f=u=_=m=g=v=E=y=0,d=p=1,n.svg=!!(t.getCTM&&U0(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[ke]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ke]!=="none"?l[ke]:"")),i.scale=i.rotate=i.translate="none"),x=ep(t,n.svg),n.svg&&(n.uncache?($=t.getBBox(),c=n.xOrigin-$.x+"px "+(n.yOrigin-$.y)+"px",O=""):O=!e&&t.getAttribute("data-svg-origin"),Kf(t,O||c,!!O||n.originIsAbsolute,n.smooth!==!1,x)),M=n.xOrigin||0,b=n.yOrigin||0,x!==bl&&(D=x[0],I=x[1],F=x[2],L=x[3],h=B=x[4],f=G=x[5],x.length===6?(d=Math.sqrt(D*D+I*I),p=Math.sqrt(L*L+F*F),_=D||I?ea(I,D)*Zr:0,v=F||L?ea(F,L)*Zr+_:0,v&&(p*=Math.abs(Math.cos(v*ia))),n.svg&&(h-=M-(M*D+b*F),f-=b-(M*I+b*L))):(it=x[6],j=x[7],C=x[8],K=x[9],gt=x[10],z=x[11],h=x[12],f=x[13],u=x[14],S=ea(it,gt),m=S*Zr,S&&(R=Math.cos(-S),A=Math.sin(-S),O=B*R+C*A,$=G*R+K*A,V=it*R+gt*A,C=B*-A+C*R,K=G*-A+K*R,gt=it*-A+gt*R,z=j*-A+z*R,B=O,G=$,it=V),S=ea(-F,gt),g=S*Zr,S&&(R=Math.cos(-S),A=Math.sin(-S),O=D*R-C*A,$=I*R-K*A,V=F*R-gt*A,z=L*A+z*R,D=O,I=$,F=V),S=ea(I,D),_=S*Zr,S&&(R=Math.cos(S),A=Math.sin(S),O=D*R+I*A,$=B*R+G*A,I=I*R-D*A,G=G*R-B*A,D=O,B=$),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,g=180-g),d=qe(Math.sqrt(D*D+I*I+F*F)),p=qe(Math.sqrt(G*G+it*it)),S=ea(B,G),v=Math.abs(S)>2e-4?S*Zr:0,y=z?1/(z<0?-z:z):0),n.svg&&(O=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!F0(xi(t,ke)),O&&t.setAttribute("transform",O))),Math.abs(v)>90&&Math.abs(v)<270&&(r?(d*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(p*=-1,v+=v<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=u+o,n.scaleX=qe(d),n.scaleY=qe(p),n.rotation=qe(_)+a,n.rotationX=qe(m)+a,n.rotationY=qe(g)+a,n.skewX=v+a,n.skewY=E+a,n.transformPerspective=y+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[si]=cu(c)),n.xOffset=n.yOffset=0,n.force3D=ii.force3D,n.renderTransform=n.svg?Lw:D0?B0:Iw,n.uncache=0,n},cu=function(t){return(t=t.split(" "))[0]+" "+t[1]},Yf=function(t,e,n){var i=wn(e);return qe(parseFloat(e)+parseFloat(fr(t,"x",n+"px",i)))+i},Iw=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,B0(t,e)},qr="0deg",Ml="0px",Yr=") ",B0=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,f=n.rotationX,u=n.skewX,d=n.skewY,p=n.scaleX,_=n.scaleY,m=n.transformPerspective,g=n.force3D,v=n.target,E=n.zOrigin,y="",M=g==="auto"&&t&&t!==1||g===!0;if(E&&(f!==qr||h!==qr)){var b=parseFloat(h)*ia,x=Math.sin(b),S=Math.cos(b),R;b=parseFloat(f)*ia,R=Math.cos(b),o=Yf(v,o,x*R*-E),a=Yf(v,a,-Math.sin(b)*-E),l=Yf(v,l,S*R*-E+E)}m!==Ml&&(y+="perspective("+m+Yr),(i||r)&&(y+="translate("+i+"%, "+r+"%) "),(M||o!==Ml||a!==Ml||l!==Ml)&&(y+=l!==Ml||M?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Yr),c!==qr&&(y+="rotate("+c+Yr),h!==qr&&(y+="rotateY("+h+Yr),f!==qr&&(y+="rotateX("+f+Yr),(u!==qr||d!==qr)&&(y+="skew("+u+", "+d+Yr),(p!==1||_!==1)&&(y+="scale("+p+", "+_+Yr),v.style[ke]=y||"translate(0, 0)"},Lw=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,f=n.scaleX,u=n.scaleY,d=n.target,p=n.xOrigin,_=n.yOrigin,m=n.xOffset,g=n.yOffset,v=n.forceCSS,E=parseFloat(o),y=parseFloat(a),M,b,x,S,R;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=ia,c*=ia,M=Math.cos(l)*f,b=Math.sin(l)*f,x=Math.sin(l-c)*-u,S=Math.cos(l-c)*u,c&&(h*=ia,R=Math.tan(c-h),R=Math.sqrt(1+R*R),x*=R,S*=R,h&&(R=Math.tan(h),R=Math.sqrt(1+R*R),M*=R,b*=R)),M=qe(M),b=qe(b),x=qe(x),S=qe(S)):(M=f,S=u,b=x=0),(E&&!~(o+"").indexOf("px")||y&&!~(a+"").indexOf("px"))&&(E=fr(d,"x",o,"px"),y=fr(d,"y",a,"px")),(p||_||m||g)&&(E=qe(E+p-(p*M+_*x)+m),y=qe(y+_-(p*b+_*S)+g)),(i||r)&&(R=d.getBBox(),E=qe(E+i/100*R.width),y=qe(y+r/100*R.height)),R="matrix("+M+","+b+","+x+","+S+","+E+","+y+")",d.setAttribute("transform",R),v&&(d.style[ke]=R)},Dw=function(t,e,n,i,r){var o=360,a=un(r),l=parseFloat(r)*(a&&~r.indexOf("rad")?Zr:1),c=l-i,h=i+c+"deg",f,u;return a&&(f=r.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*S0)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*S0)%o-~~(c/o)*o)),t._pt=u=new Xn(t._pt,e,n,i,c,mw),u.e=h,u.u="deg",t._props.push(n),u},R0=function(t,e){for(var n in e)t[n]=e[n];return t},Nw=function(t,e,n){var i=R0({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,f,u,d,p;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[ke]=e,a=wl(n,1),dr(n,ke),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ke],o[ke]=e,a=wl(n,1),o[ke]=c);for(l in Ns)c=i[l],h=a[l],c!==h&&r.indexOf(l)<0&&(d=wn(c),p=wn(h),f=d!==p?fr(n,l,c,p):parseFloat(c),u=parseFloat(h),t._pt=new Xn(t._pt,a,l,f,u-f,Zf),t._pt.u=p||0,t._props.push(l));R0(a,i)};Wn("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",o=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(a){return t<2?s+a:"border"+a+s});lu[t>1?"border"+s:s]=function(a,l,c,h,f){var u,d;if(arguments.length<4)return u=o.map(function(p){return Ds(a,p,c)}),d=u.join(" "),d.split(u[0]).length===5?u[0]:d;u=(h+"").split(" "),d={},o.forEach(function(p,_){return d[p]=u[_]=u[_]||u[(_-1)/2|0]}),a.init(l,d,f)}});var np={name:"css",register:Jf,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var o=this._props,a=t.style,l=n.vars.startAt,c,h,f,u,d,p,_,m,g,v,E,y,M,b,x,S,R;Qf||Jf(),this.styles=this.styles||L0(t),S=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(ti[_]&&Gf(_,e,n,i,t,r)))){if(d=typeof h,p=lu[_],d==="function"&&(h=h.call(n,i,t,r),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=ta(h)),p)p(this,t,_,h,n)&&(x=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",Is.lastIndex=0,Is.test(c)||(m=wn(c),g=wn(h),g?m!==g&&(c=fr(t,_,c,g)+g):m&&(h+=m)),this.add(a,"setProperty",c,h,i,r,0,0,_),o.push(_),S.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],un(c)&&~c.indexOf("random(")&&(c=ta(c)),wn(c+"")||c==="auto"||(c+=ii.units[_]||wn(Ds(t,_))||""),(c+"").charAt(1)==="="&&(c=Ds(t,_))):c=Ds(t,_),u=parseFloat(c),v=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),f=parseFloat(h),_ in ds&&(_==="autoAlpha"&&(u===1&&Ds(t,"visibility")==="hidden"&&f&&(u=0),S.push("visibility",0,a.visibility),ur(this,a,"visibility",u?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=ds[_],~_.indexOf(",")&&(_=_.split(",")[0]))),E=_ in Ns,E){if(this.styles.save(_),R=h,d==="string"&&h.substring(0,6)==="var(--"){if(h=xi(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var A=t.style.perspective;t.style.perspective=h,h=xi(t,"perspective"),A?t.style.perspective=A:dr(t,"perspective")}f=parseFloat(h)}if(y||(M=t._gsap,M.renderTransform&&!e.parseTransform||wl(t,e.parseTransform),b=e.smoothOrigin!==!1&&M.smooth,y=this._pt=new Xn(this._pt,a,ke,0,1,M.renderTransform,M,0,-1),y.dep=1),_==="scale")this._pt=new Xn(this._pt,M,"scaleY",M.scaleY,(v?Wr(M.scaleY,v+f):f)-M.scaleY||0,Zf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){S.push(si,0,a[si]),h=Cw(h),M.svg?Kf(t,h,0,b,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==M.zOrigin&&ur(this,M,"zOrigin",M.zOrigin,g),ur(this,a,_,cu(c),cu(h)));continue}else if(_==="svgOrigin"){Kf(t,h,1,b,0,this);continue}else if(_ in O0){Dw(this,M,_,u,v?Wr(u,v+h):h);continue}else if(_==="smoothOrigin"){ur(this,M,"smooth",M.smooth,h);continue}else if(_==="force3D"){M[_]=h;continue}else if(_==="transform"){Nw(this,h,t);continue}}else _ in a||(_=sa(_)||_);if(E||(f||f===0)&&(u||u===0)&&!pw.test(h)&&_ in a)m=(c+"").substr((u+"").length),f||(f=0),g=wn(h)||(_ in ii.units?ii.units[_]:m),m!==g&&(u=fr(t,_,c,g)),this._pt=new Xn(this._pt,E?M:a,_,u,(v?Wr(u,v+f):f)-u,!E&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?xw:Zf),this._pt.u=g||0,E&&R!==h?(this._pt.b=c,this._pt.e=R,this._pt.r=_w):m!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=gw);else if(_ in a)Rw.call(this,t,_,c,v?v+h:h);else if(_ in t)this.add(t,_,c||t[_],v?v+h:h,i,r);else if(_!=="parseTransform"){iu(_,h);continue}E||(_ in a?S.push(_,0,a[_]):typeof t[_]=="function"?S.push(_,2,t[_]()):S.push(_,1,c||t[_])),o.push(_)}}x&&qf(this)},render:function(t,e){if(e.tween._time||!jf())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ds,aliases:ds,getSetter:function(t,e,n){var i=ds[e];return i&&i.indexOf(",")<0&&(e=i),e in Ns&&e!==si&&(t._gsap.x||Ds(t,"x"))?n&&y0===n?e==="scale"?Mw:Sw:(y0=n||{})&&(e==="scale"?bw:ww):t.style&&!nu(t.style[e])?vw:~e.indexOf("-")?yw:au(t,e)},core:{_removeProperty:dr,_getMatrix:ep}};On.utils.checkPrefix=sa;On.core.getStyleSaver=L0;(function(s,t,e,n){var i=Wn(s+","+t+","+e,function(r){Ns[r]=1});Wn(t,function(r){ii.units[r]="deg",O0[r]=1}),ds[i[13]]=s+","+t,Wn(n,function(r){var o=r.split(":");ds[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Wn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){ii.units[s]="px"});On.registerPlugin(np);var fs=On.registerPlugin(np)||On,xC=fs.core.Tween;function z0(s,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(s,n.key,n)}}function Uw(s,t,e){return t&&z0(s.prototype,t),e&&z0(s,e),s}var Tn,du,Ow,ri,pr,mr,oa,G0,Jr,aa,H0,Us,Ki,V0,W0=function(){return Tn||typeof window<"u"&&(Tn=window.gsap)&&Tn.registerPlugin&&Tn},X0=1,ra=[],Kt=[],Qi=[],El=Date.now,ip=function(t,e){return e},Fw=function(){var t=aa.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,Kt),i.push.apply(i,Qi),Kt=n,Qi=i,ip=function(o,a){return e[o](a)}},Fs=function(t,e){return~Qi.indexOf(t)&&Qi[Qi.indexOf(t)+1][e]},Al=function(t){return!!~H0.indexOf(t)},Yn=function(t,e,n,i,r){return t.addEventListener(e,n,{passive:i!==!1,capture:!!r})},qn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},hu="scrollLeft",uu="scrollTop",sp=function(){return Us&&Us.isPressed||Kt.cache++},fu=function(t,e){var n=function i(r){if(r||r===0){X0&&ri.history.scrollRestoration!=="manual"&&(ri.history.scrollRestoration="manual");var o=Us&&Us.isPressed;r=i.v=Math.round(r)||(Us&&Us.iOS?1:0),t(r),i.cacheID=Kt.cache,o&&ip("ss",r)}else(e||Kt.cache!==i.cacheID||ip("ref"))&&(i.cacheID=Kt.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},Fn={s:hu,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:fu(function(s){return arguments.length?ri.scrollTo(s,en.sc()):ri.pageXOffset||pr[hu]||mr[hu]||oa[hu]||0})},en={s:uu,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Fn,sc:fu(function(s){return arguments.length?ri.scrollTo(Fn.sc(),s):ri.pageYOffset||pr[uu]||mr[uu]||oa[uu]||0})},Zn=function(t,e){return(e&&e._ctx&&e._ctx.selector||Tn.utils.toArray)(t)[0]||(typeof t=="string"&&Tn.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},Bw=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},Os=function(t,e){var n=e.s,i=e.sc;Al(t)&&(t=pr.scrollingElement||mr);var r=Kt.indexOf(t),o=i===en.sc?1:2;!~r&&(r=Kt.push(t)-1),Kt[r+o]||Yn(t,"scroll",sp);var a=Kt[r+o],l=a||(Kt[r+o]=fu(Fs(t,n),!0)||(Al(t)?i:fu(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=Tn.getProperty(t,"scrollBehavior")==="smooth"),l},pu=function(t,e,n){var i=t,r=t,o=El(),a=o,l=e||50,c=Math.max(500,l*3),h=function(p,_){var m=El();_||m-o>l?(r=i,i=p,a=o,o=m):n?i+=p:i=r+(p-r)/(m-a)*(o-a)},f=function(){r=i=n?0:i,a=o=0},u=function(p){var _=a,m=r,g=El();return(p||p===0)&&p!==i&&h(p),o===a||g-a>c?0:(i+(n?m:-m))/((n?g:o)-_)*1e3};return{update:h,reset:f,getVelocity:u}},Tl=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},k0=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},q0=function(){aa=Tn.core.globals().ScrollTrigger,aa&&aa.core&&Fw()},Y0=function(t){return Tn=t||W0(),!du&&Tn&&typeof document<"u"&&document.body&&(ri=window,pr=document,mr=pr.documentElement,oa=pr.body,H0=[ri,pr,mr,oa],Ow=Tn.utils.clamp,V0=Tn.core.context||function(){},Jr="onpointerenter"in oa?"pointer":"mouse",G0=Ye.isTouch=ri.matchMedia&&ri.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ri||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ki=Ye.eventTypes=("ontouchstart"in mr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in mr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return X0=0},500),du=1),aa||q0(),du};Fn.op=en;Kt.cache=0;var Ye=(function(){function s(e){this.init(e)}var t=s.prototype;return t.init=function(n){du||Y0(Tn)||console.warn("Please gsap.registerPlugin(Observer)"),aa||q0();var i=n.tolerance,r=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,f=n.onStop,u=n.onStopDelay,d=n.ignore,p=n.wheelSpeed,_=n.event,m=n.onDragStart,g=n.onDragEnd,v=n.onDrag,E=n.onPress,y=n.onRelease,M=n.onRight,b=n.onLeft,x=n.onUp,S=n.onDown,R=n.onChangeX,A=n.onChangeY,D=n.onChange,I=n.onToggleX,F=n.onToggleY,L=n.onHover,B=n.onHoverEnd,G=n.onMove,O=n.ignoreCheck,$=n.isNormalizer,V=n.onGestureStart,C=n.onGestureEnd,K=n.onWheel,gt=n.onEnable,j=n.onDisable,z=n.onClick,it=n.scrollSpeed,ut=n.capture,bt=n.allowClicks,lt=n.lockAxis,Ct=n.onLockAxis;this.target=a=Zn(a)||mr,this.vars=n,d&&(d=Tn.utils.toArray(d)),i=i||1e-9,r=r||0,p=p||1,it=it||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ri.getComputedStyle(oa).lineHeight)||22);var re,Pt,Ht,It,Ot,pe,ue,Q=this,ie=0,Je=0,we=n.passive||!h&&n.passive!==!1,ce=Os(a,Fn),He=Os(a,en),Ze=ce(),k=He(),_e=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Ki[0]==="pointerdown",de=Al(a),Wt=a.ownerDocument||pr,_t=[0,0,0],me=[0,0,0],Ft=0,kt=function(){return Ft=El()},P=function(yt,at){return(Q.event=yt)&&d&&Bw(yt.target,d)||at&&_e&&yt.pointerType!=="touch"||O&&O(yt,at)},w=function(){Q._vx.reset(),Q._vy.reset(),Pt.pause(),f&&f(Q)},q=function(){var yt=Q.deltaX=k0(_t),at=Q.deltaY=k0(me),st=Math.abs(yt)>=i,Mt=Math.abs(at)>=i;D&&(st||Mt)&&D(Q,yt,at,_t,me),st&&(M&&Q.deltaX>0&&M(Q),b&&Q.deltaX<0&&b(Q),R&&R(Q),I&&Q.deltaX<0!=ie<0&&I(Q),ie=Q.deltaX,_t[0]=_t[1]=_t[2]=0),Mt&&(S&&Q.deltaY>0&&S(Q),x&&Q.deltaY<0&&x(Q),A&&A(Q),F&&Q.deltaY<0!=Je<0&&F(Q),Je=Q.deltaY,me[0]=me[1]=me[2]=0),(It||Ht)&&(G&&G(Q),Ht&&(m&&Ht===1&&m(Q),v&&v(Q),Ht=0),It=!1),pe&&!(pe=!1)&&Ct&&Ct(Q),Ot&&(K(Q),Ot=!1),re=0},ct=function(yt,at,st){_t[st]+=yt,me[st]+=at,Q._vx.update(yt),Q._vy.update(at),c?re||(re=requestAnimationFrame(q)):q()},ot=function(yt,at){lt&&!ue&&(Q.axis=ue=Math.abs(yt)>Math.abs(at)?"x":"y",pe=!0),ue!=="y"&&(_t[2]+=yt,Q._vx.update(yt,!0)),ue!=="x"&&(me[2]+=at,Q._vy.update(at,!0)),c?re||(re=requestAnimationFrame(q)):q()},mt=function(yt){if(!P(yt,1)){yt=Tl(yt,h);var at=yt.clientX,st=yt.clientY,Mt=at-Q.x,rt=st-Q.y,At=Q.isDragging;Q.x=at,Q.y=st,(At||(Mt||rt)&&(Math.abs(Q.startX-at)>=r||Math.abs(Q.startY-st)>=r))&&(Ht||(Ht=At?2:1),At||(Q.isDragging=!0),ot(Mt,rt))}},St=Q.onPress=function(dt){P(dt,1)||dt&&dt.button||(Q.axis=ue=null,Pt.pause(),Q.isPressed=!0,dt=Tl(dt),ie=Je=0,Q.startX=Q.x=dt.clientX,Q.startY=Q.y=dt.clientY,Q._vx.reset(),Q._vy.reset(),Yn($?a:Wt,Ki[1],mt,we,!0),Q.deltaX=Q.deltaY=0,E&&E(Q))},Y=Q.onRelease=function(dt){if(!P(dt,1)){qn($?a:Wt,Ki[1],mt,!0);var yt=!isNaN(Q.y-Q.startY),at=Q.isDragging,st=at&&(Math.abs(Q.x-Q.startX)>3||Math.abs(Q.y-Q.startY)>3),Mt=Tl(dt);!st&&yt&&(Q._vx.reset(),Q._vy.reset(),h&&bt&&Tn.delayedCall(.08,function(){if(El()-Ft>300&&!dt.defaultPrevented){if(dt.target.click)dt.target.click();else if(Wt.createEvent){var rt=Wt.createEvent("MouseEvents");rt.initMouseEvent("click",!0,!0,ri,1,Mt.screenX,Mt.screenY,Mt.clientX,Mt.clientY,!1,!1,!1,!1,0,null),dt.target.dispatchEvent(rt)}}})),Q.isDragging=Q.isGesturing=Q.isPressed=!1,f&&at&&!$&&Pt.restart(!0),Ht&&q(),g&&at&&g(Q),y&&y(Q,st)}},nt=function(yt){return yt.touches&&yt.touches.length>1&&(Q.isGesturing=!0)&&V(yt,Q.isDragging)},pt=function(){return(Q.isGesturing=!1)||C(Q)},N=function(yt){if(!P(yt)){var at=ce(),st=He();ct((at-Ze)*it,(st-k)*it,1),Ze=at,k=st,f&&Pt.restart(!0)}},et=function(yt){if(!P(yt)){yt=Tl(yt,h),K&&(Ot=!0);var at=(yt.deltaMode===1?l:yt.deltaMode===2?ri.innerHeight:1)*p;ct(yt.deltaX*at,yt.deltaY*at,0),f&&!$&&Pt.restart(!0)}},tt=function(yt){if(!P(yt)){var at=yt.clientX,st=yt.clientY,Mt=at-Q.x,rt=st-Q.y;Q.x=at,Q.y=st,It=!0,f&&Pt.restart(!0),(Mt||rt)&&ot(Mt,rt)}},xt=function(yt){Q.event=yt,L(Q)},ft=function(yt){Q.event=yt,B(Q)},vt=function(yt){return P(yt)||Tl(yt,h)&&z(Q)};Pt=Q._dc=Tn.delayedCall(u||.25,w).pause(),Q.deltaX=Q.deltaY=0,Q._vx=pu(0,50,!0),Q._vy=pu(0,50,!0),Q.scrollX=ce,Q.scrollY=He,Q.isDragging=Q.isGesturing=Q.isPressed=!1,V0(this),Q.enable=function(dt){return Q.isEnabled||(Yn(de?Wt:a,"scroll",sp),o.indexOf("scroll")>=0&&Yn(de?Wt:a,"scroll",N,we,ut),o.indexOf("wheel")>=0&&Yn(a,"wheel",et,we,ut),(o.indexOf("touch")>=0&&G0||o.indexOf("pointer")>=0)&&(Yn(a,Ki[0],St,we,ut),Yn(Wt,Ki[2],Y),Yn(Wt,Ki[3],Y),bt&&Yn(a,"click",kt,!0,!0),z&&Yn(a,"click",vt),V&&Yn(Wt,"gesturestart",nt),C&&Yn(Wt,"gestureend",pt),L&&Yn(a,Jr+"enter",xt),B&&Yn(a,Jr+"leave",ft),G&&Yn(a,Jr+"move",tt)),Q.isEnabled=!0,Q.isDragging=Q.isGesturing=Q.isPressed=It=Ht=!1,Q._vx.reset(),Q._vy.reset(),Ze=ce(),k=He(),dt&&dt.type&&St(dt),gt&&gt(Q)),Q},Q.disable=function(){Q.isEnabled&&(ra.filter(function(dt){return dt!==Q&&Al(dt.target)}).length||qn(de?Wt:a,"scroll",sp),Q.isPressed&&(Q._vx.reset(),Q._vy.reset(),qn($?a:Wt,Ki[1],mt,!0)),qn(de?Wt:a,"scroll",N,ut),qn(a,"wheel",et,ut),qn(a,Ki[0],St,ut),qn(Wt,Ki[2],Y),qn(Wt,Ki[3],Y),qn(a,"click",kt,!0),qn(a,"click",vt),qn(Wt,"gesturestart",nt),qn(Wt,"gestureend",pt),qn(a,Jr+"enter",xt),qn(a,Jr+"leave",ft),qn(a,Jr+"move",tt),Q.isEnabled=Q.isPressed=Q.isDragging=!1,j&&j(Q))},Q.kill=Q.revert=function(){Q.disable();var dt=ra.indexOf(Q);dt>=0&&ra.splice(dt,1),Us===Q&&(Us=0)},ra.push(Q),$&&Al(a)&&(Us=Q),Q.enable(_)},Uw(s,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),s})();Ye.version="3.15.1";Ye.create=function(s){return new Ye(s)};Ye.register=Y0;Ye.getAll=function(){return ra.slice()};Ye.getById=function(s){return ra.filter(function(t){return t.vars.id===s})[0]};W0()&&Tn.registerPlugin(Ye);var Lt,ua,ee,Me,Si,Se,xp,Pu,kl,Nl,Cl,mu,Bn,Du,up,Jn,Z0,$0,da,u_,rp,d_,$n,dp,f_,p_,gr,fp,vp,fa,yp,_r,pp,op,gu=1,zn=Date.now,ap=zn(),zi=0,Pl=0,J0=function(t,e,n){var i=yi(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},K0=function(t,e){return e&&(!yi(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},zw=function s(){return Pl&&requestAnimationFrame(s)},Q0=function(){return Du=1},j0=function(){return Du=0},ps=function(t){return t},Il=function(t){return Math.round(t*1e5)/1e5||0},m_=function(){return typeof window<"u"},g_=function(){return Lt||m_()&&(Lt=window.gsap)&&Lt.registerPlugin&&Lt},no=function(t){return!!~xp.indexOf(t)},__=function(t){return(t==="Height"?yp:ee["inner"+t])||Si["client"+t]||Se["client"+t]},x_=function(t){return Fs(t,"getBoundingClientRect")||(no(t)?function(){return Cu.width=ee.innerWidth,Cu.height=yp,Cu}:function(){return Bs(t)})},kw=function(t,e,n){var i=n.d,r=n.d2,o=n.a;return(o=Fs(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?__(r):t["client"+r])||0}},Gw=function(t,e){return!e||~Qi.indexOf(t)?x_(t):function(){return Cu}},ms=function(t,e){var n=e.s,i=e.d2,r=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=Fs(t,n))?o()-x_(t)()[r]:no(t)?(Si[n]||Se[n])-__(i):t[n]-t["offset"+i])},_u=function(t,e){for(var n=0;n<da.length;n+=3)(!e||~e.indexOf(da[n+1]))&&t(da[n],da[n+1],da[n+2])},yi=function(t){return typeof t=="string"},kn=function(t){return typeof t=="function"},Ll=function(t){return typeof t=="number"},Kr=function(t){return typeof t=="object"},Rl=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},la=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},ca=Math.abs,v_="left",y_="top",Sp="right",Mp="bottom",jr="width",to="height",Ul="Right",Ol="Left",Fl="Top",Bl="Bottom",nn="padding",Fi="margin",ma="Width",bp="Height",dn="px",Bi=function(t){return ee.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},Hw=function(t){var e=Bi(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},t_=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Bs=function(t,e){var n=e&&Bi(t)[up]!=="matrix(1, 0, 0, 1, 0, 0)"&&Lt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},Iu=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},S_=function(t){var e=[],n=t.labels,i=t.duration(),r;for(r in n)e.push(n[r]/i);return e},Vw=function(t){return function(e){return Lt.utils.snap(S_(t),e)}},wp=function(t){var e=Lt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,r){return i-r});return n?function(i,r,o){o===void 0&&(o=.001);var a;if(!r)return e(i);if(r>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,r,o){o===void 0&&(o=.001);var a=e(i);return!r||Math.abs(a-i)<o||a-i<0==r<0?a:e(r<0?i-t:i+t)}},Ww=function(t){return function(e,n){return wp(S_(t))(e,n.direction)}},xu=function(t,e,n,i){return n.split(",").forEach(function(r){return t(e,r,i)})},xn=function(t,e,n,i,r){return t.addEventListener(e,n,{passive:!i,capture:!!r})},_n=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},vu=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},e_={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},yu={toggleActions:"play",anticipatePin:0},Lu={top:0,left:0,center:.5,bottom:1,right:1},Tu=function(t,e){if(yi(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in Lu?Lu[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},Su=function(t,e,n,i,r,o,a,l){var c=r.startColor,h=r.endColor,f=r.fontSize,u=r.indent,d=r.fontWeight,p=Me.createElement("div"),_=no(n)||Fs(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,g=_?Se:n.tagName==="IFRAME"?n.contentDocument.body:n,v=t.indexOf("start")!==-1,E=v?c:h,y="border-color:"+E+";font-size:"+f+";color:"+E+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(y+=(i===en?Sp:Mp)+":"+(o+parseFloat(u))+"px;"),a&&(y+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=v,p.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),p.style.cssText=y,p.innerText=e||e===0?t+"-"+e:t,g.children[0]?g.insertBefore(p,g.children[0]):g.appendChild(p),p._offset=p["offset"+i.op.d2],Eu(p,0,i,v),p},Eu=function(t,e,n,i){var r={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,r[n.a+"Percent"]=i?-100:0,r[n.a]=i?"1px":0,r["border"+o+ma]=1,r["border"+a+ma]=0,r[n.p]=e+"px",Lt.set(t,r)},te=[],mp={},Gl,n_=function(){return zn()-zi>34&&(Gl||(Gl=requestAnimationFrame(zs)))},ha=function(){(!$n||!$n.isPressed||$n.startX>Se.clientWidth)&&(Kt.cache++,$n?Gl||(Gl=requestAnimationFrame(zs)):zs(),zi||so("scrollStart"),zi=zn())},lp=function(){p_=ee.innerWidth,f_=ee.innerHeight},Dl=function(t){Kt.cache++,(t===!0||!Bn&&!d_&&!Me.fullscreenElement&&!Me.webkitFullscreenElement&&(!dp||p_!==ee.innerWidth||Math.abs(ee.innerHeight-f_)>ee.innerHeight*.25))&&Pu.restart(!0)},io={},Xw=[],M_=function s(){return _n($t,"scrollEnd",s)||Qr(!0)},so=function(t){return io[t]&&io[t].map(function(e){return e()})||Xw},vi=[],b_=function(t){for(var e=0;e<vi.length;e+=5)(!t||vi[e+4]&&vi[e+4].query===t)&&(vi[e].style.cssText=vi[e+1],vi[e].getBBox&&vi[e].setAttribute("transform",vi[e+2]||""),vi[e+3].uncache=1)},w_=function(){Kt.cache++,Kt.forEach(function(t){return kn(t)&&(t.rec=t())})},Tp=function(t,e){var n;for(Jn=0;Jn<te.length;Jn++)n=te[Jn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));_r=!0,e&&b_(e),e||so("revert")},T_=function(t,e){Kt.cache++,(e||!Kn)&&Kt.forEach(function(n){return kn(n)&&n.cacheID++&&(n.rec=0)}),yi(t)&&(vp=t,ee.history.scrollRestoration!==t&&(ee.history.scrollRestoration=t))},Kn,eo=0,i_,qw=function(){if(i_!==eo){var t=i_=eo;requestAnimationFrame(function(){return t===eo&&Qr(!0)})}},E_=function(){Se.appendChild(fa),yp=!$n&&fa.offsetHeight||ee.innerHeight,Se.removeChild(fa)},s_=function(t){return kl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Qr=function(t,e){if(Si=Me.documentElement,Se=Me.body,xp=[ee,Me,Si,Se],zi&&!t&&!_r){xn($t,"scrollEnd",M_);return}E_(),Kn=$t.isRefreshing=!0,_r||w_();var n=so("refreshInit");u_&&$t.sort(),e||Tp(),Kt.forEach(function(i){kn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),te.slice(0).forEach(function(i){return i.refresh()}),_r=!1,te.forEach(function(i){if(i._subPinOffset&&i.pin){var r=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[r];i.revert(!0,1),i.adjustPinSpacing(i.pin[r]-o),i.refresh()}}),pp=1,s_(!0),te.forEach(function(i){var r=ms(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>r,a=i._startClamp&&i.start>=r;(o||a)&&i.setPositions(a?r-1:i.start,o?Math.max(a?r:i.start+1,r):i.end,!0)}),s_(!1),pp=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Kt.forEach(function(i){kn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),T_(vp,1),Pu.pause(),eo++,Kn=2,zs(2),te.forEach(function(i){return kn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Kn=$t.isRefreshing=!1,so("refresh")},gp=0,Au=1,zl,zs=function(t){if(t===2||!Kn&&!_r){$t.isUpdating=!0,zl&&zl.update(0);var e=te.length,n=zn(),i=n-ap>=50,r=e&&te[0].scroll();if(Au=gp>r?-1:1,Kn||(gp=r),i&&(zi&&!Du&&n-zi>200&&(zi=0,so("scrollEnd")),Cl=ap,ap=n),Au<0){for(Jn=e;Jn-- >0;)te[Jn]&&te[Jn].update(0,i);Au=1}else for(Jn=0;Jn<e;Jn++)te[Jn]&&te[Jn].update(0,i);$t.isUpdating=!1}Gl=0},_p=[v_,y_,Mp,Sp,Fi+Bl,Fi+Ul,Fi+Fl,Fi+Ol,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ru=_p.concat([jr,to,"boxSizing","max"+ma,"max"+bp,"position",Fi,nn,nn+Fl,nn+Ul,nn+Bl,nn+Ol]),Yw=function(t,e,n){pa(n);var i=t._gsap;if(i.spacerIsNative)pa(i.spacerState);else if(t._gsap.swappedIn){var r=e.parentNode;r&&(r.insertBefore(t,e),r.removeChild(e))}t._gsap.swappedIn=!1},cp=function(t,e,n,i){if(!t._gsap.swappedIn){for(var r=_p.length,o=e.style,a=t.style,l;r--;)l=_p[r],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Mp]=a[Sp]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[jr]=Iu(t,Fn)+dn,o[to]=Iu(t,en)+dn,o[nn]=a[Fi]=a[y_]=a[v_]="0",pa(i),a[jr]=a["max"+ma]=n[jr],a[to]=a["max"+bp]=n[to],a[nn]=n[nn],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},Zw=/([A-Z])/g,pa=function(t){if(t){var e=t.t.style,n=t.length,i=0,r,o;for((t.t._gsap||Lt.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],r=t[i],o?e[r]=o:e[r]&&e.removeProperty(r.replace(Zw,"-$1").toLowerCase())}},Mu=function(t){for(var e=Ru.length,n=t.style,i=[],r=0;r<e;r++)i.push(Ru[r],n[Ru[r]]);return i.t=t,i},$w=function(t,e,n){for(var i=[],r=t.length,o=n?8:0,a;o<r;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},Cu={left:0,top:0},r_=function(t,e,n,i,r,o,a,l,c,h,f,u,d,p){kn(t)&&(t=t(l)),yi(t)&&t.substr(0,3)==="max"&&(t=u+(t.charAt(4)==="="?Tu("0"+t.substr(3),n):0));var _=d?d.time():0,m,g,v;if(d&&d.seek(0),isNaN(t)||(t=+t),Ll(t))d&&(t=Lt.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,u,t)),a&&Eu(a,n,i,!0);else{kn(e)&&(e=e(l));var E=(t||"0").split(" "),y,M,b,x;v=Zn(e,l)||Se,y=Bs(v)||{},(!y||!y.left&&!y.top)&&Bi(v).display==="none"&&(x=v.style.display,v.style.display="block",y=Bs(v),x?v.style.display=x:v.style.removeProperty("display")),M=Tu(E[0],y[i.d]),b=Tu(E[1]||"0",n),t=y[i.p]-c[i.p]-h+M+r-b,a&&Eu(a,b,i,n-b<20||a._isStart&&b>20),n-=n-b}if(p&&(l[p]=t||-.001,t<0&&(t=0)),o){var S=t+n,R=o._isStart;m="scroll"+i.d2,Eu(o,S,i,R&&S>20||!R&&(f?Math.max(Se[m],Si[m]):o.parentNode[m])<=S+1),f&&(c=Bs(a),f&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+dn))}return d&&v&&(m=Bs(v),d.seek(u),g=Bs(v),d._caScrollDist=m[i.p]-g[i.p],t=t/d._caScrollDist*u),d&&d.seek(_),d?t:Math.round(t)},Jw=/(webkit|moz|length|cssText|inset)/i,o_=function(t,e,n,i){if(t.parentNode!==e){var r=t.style,o,a;if(e===Se){t._stOrig=r.cssText,a=Bi(t);for(o in a)!+o&&!Jw.test(o)&&a[o]&&typeof r[o]=="string"&&o!=="0"&&(r[o]=a[o]);r.top=n,r.left=i}else r.cssText=t._stOrig;Lt.core.getCache(t).uncache=1,e.appendChild(t)}},A_=function(t,e,n){var i=e,r=i;return function(o){var a=Math.round(t());return a!==i&&a!==r&&Math.abs(a-i)>3&&Math.abs(a-r)>3&&(o=a,n&&n()),r=i,i=Math.round(o),i}},bu=function(t,e,n){var i={};i[e.p]="+="+n,Lt.set(t,i)},a_=function(t,e){var n=Os(t,e),i="_scroll"+e.p2,r=function o(a,l,c,h,f){var u=o.tween,d=l.onComplete,p={};c=c||n();var _=A_(n,c,function(){u.kill(),o.tween=0});return f=h&&f||0,h=h||a-c,u&&u.kill(),l[i]=a,l.inherit=!1,l.modifiers=p,p[i]=function(){return _(c+h*u.ratio+f*u.ratio*u.ratio)},l.onUpdate=function(){Kt.cache++,o.tween&&zs()},l.onComplete=function(){o.tween=0,d&&d.call(u)},u=o.tween=Lt.to(t,l),u};return t[i]=n,n.wheelHandler=function(){return r.tween&&r.tween.kill()&&(r.tween=0)},xn(t,"wheel",n.wheelHandler),$t.isTouch&&xn(t,"touchmove",n.wheelHandler),r},$t=(function(){function s(e,n){ua||s.register(Lt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),fp(this),this.init(e,n)}var t=s.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Pl){this.update=this.refresh=this.kill=ps;return}n=t_(yi(n)||Ll(n)||n.nodeType?{trigger:n}:n,yu);var r=n,o=r.onUpdate,a=r.toggleClass,l=r.id,c=r.onToggle,h=r.onRefresh,f=r.scrub,u=r.trigger,d=r.pin,p=r.pinSpacing,_=r.invalidateOnRefresh,m=r.anticipatePin,g=r.onScrubComplete,v=r.onSnapComplete,E=r.once,y=r.snap,M=r.pinReparent,b=r.pinSpacer,x=r.containerAnimation,S=r.fastScrollEnd,R=r.preventOverlaps,A=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Fn:en,D=!f&&f!==0,I=Zn(n.scroller||ee),F=Lt.core.getCache(I),L=no(I),B=("pinType"in n?n.pinType:Fs(I,"pinType")||L&&"fixed")==="fixed",G=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],O=D&&n.toggleActions.split(" "),$="markers"in n?n.markers:yu.markers,V=L?0:parseFloat(Bi(I)["border"+A.p2+ma])||0,C=this,K=n.onRefreshInit&&function(){return n.onRefreshInit(C)},gt=kw(I,L,A),j=Gw(I,L),z=0,it=0,ut=0,bt=Os(I,A),lt,Ct,re,Pt,Ht,It,Ot,pe,ue,Q,ie,Je,we,ce,He,Ze,k,_e,de,Wt,_t,me,Ft,kt,P,w,q,ct,ot,mt,St,Y,nt,pt,N,et,tt,xt,ft;if(C._startClamp=C._endClamp=!1,C._dir=A,m*=45,C.scroller=I,C.scroll=x?x.time.bind(x):bt,Pt=bt(),_r&&bt.rec==null&&(bt.rec=Pt),C.vars=n,i=i||n.animation,"refreshPriority"in n&&(u_=1,n.refreshPriority===-9999&&(zl=C)),F.tweenScroll=F.tweenScroll||{top:a_(I,en),left:a_(I,Fn)},C.tweenTo=lt=F.tweenScroll[A.p],C.scrubDuration=function(st){nt=Ll(st)&&st,nt?Y?Y.duration(st):Y=Lt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:nt,paused:!0,onComplete:function(){return g&&g(C)}}):(Y&&Y.progress(1).kill(),Y=0)},i&&(i.vars.lazy=!1,i._initted&&!C.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),C.animation=i.pause(),i.scrollTrigger=C,C.scrubDuration(f),mt=0,l||(l=i.vars.id)),y&&((!Kr(y)||y.push)&&(y={snapTo:y}),"scrollBehavior"in Se.style&&Lt.set(L?[Se,Si]:I,{scrollBehavior:"auto"}),Kt.forEach(function(st){return kn(st)&&st.target===(L?Me.scrollingElement||Si:I)&&(st.smooth=!1)}),re=kn(y.snapTo)?y.snapTo:y.snapTo==="labels"?Vw(i):y.snapTo==="labelsDirectional"?Ww(i):y.directional!==!1?function(st,Mt){return wp(y.snapTo)(st,zn()-it<500?0:Mt.direction)}:Lt.utils.snap(y.snapTo),pt=y.duration||{min:.1,max:2},pt=Kr(pt)?Nl(pt.min,pt.max):Nl(pt,pt),N=Lt.delayedCall(y.delay||nt/2||.1,function(){var st=bt(),Mt=zn()-it<500,rt=lt.tween;if((Mt||Math.abs(C.getVelocity())<10)&&!rt&&!Du&&z!==st){var At=(st-It)/ce,se=i&&!D?i.totalProgress():At,Yt=Mt?0:(se-St)/(zn()-Cl)*1e3||0,Le=Lt.utils.clamp(-At,1-At,ca(Yt/2)*Yt/.185),Ke=At+(y.inertia===!1?0:Le),De,Te,ve=y,rn=ve.onStart,Ee=ve.onInterrupt,En=ve.onComplete;if(De=re(Ke,C),Ll(De)||(De=Ke),Te=Math.max(0,Math.round(It+De*ce)),st<=Ot&&st>=It&&Te!==st){if(rt&&!rt._initted&&rt.data<=ca(Te-st))return;y.inertia===!1&&(Le=De-At),lt(Te,{duration:pt(ca(Math.max(ca(Ke-se),ca(De-se))*.185/Yt/.05||0)),ease:y.ease||"power3",data:ca(Te-st),onInterrupt:function(){return N.restart(!0)&&Ee&&la(C,Ee)},onComplete:function(){C.update(),z=bt(),i&&!D&&(Y?Y.resetTo("totalProgress",De,i._tTime/i._tDur):i.progress(De)),mt=St=i&&!D?i.totalProgress():C.progress,v&&v(C),En&&la(C,En)}},st,Le*ce,Te-st-Le*ce),rn&&la(C,rn,lt.tween)}}else C.isActive&&z!==st&&N.restart(!0)}).pause()),l&&(mp[l]=C),u=C.trigger=Zn(u||d!==!0&&d),ft=u&&u._gsap&&u._gsap.stRevert,ft&&(ft=ft(C)),d=d===!0?u:Zn(d),yi(a)&&(a={targets:u,className:a}),d&&(p===!1||p===Fi||(p=!p&&d.parentNode&&d.parentNode.style&&Bi(d.parentNode).display==="flex"?!1:nn),C.pin=d,Ct=Lt.core.getCache(d),Ct.spacer?He=Ct.pinState:(b&&(b=Zn(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),Ct.spacerIsNative=!!b,b&&(Ct.spacerState=Mu(b))),Ct.spacer=_e=b||Me.createElement("div"),_e.classList.add("pin-spacer"),l&&_e.classList.add("pin-spacer-"+l),Ct.pinState=He=Mu(d)),n.force3D!==!1&&Lt.set(d,{force3D:!0}),C.spacer=_e=Ct.spacer,ot=Bi(d),kt=ot[p+A.os2],Wt=Lt.getProperty(d),_t=Lt.quickSetter(d,A.a,dn),cp(d,_e,ot),k=Mu(d)),$){Je=Kr($)?t_($,e_):e_,Q=Su("scroller-start",l,I,A,Je,0),ie=Su("scroller-end",l,I,A,Je,0,Q),de=Q["offset"+A.op.d2];var vt=Zn(Fs(I,"content")||I);pe=this.markerStart=Su("start",l,vt,A,Je,de,0,x),ue=this.markerEnd=Su("end",l,vt,A,Je,de,0,x),x&&(xt=Lt.quickSetter([pe,ue],A.a,dn)),!B&&!(Qi.length&&Fs(I,"fixedMarkers")===!0)&&(Hw(L?Se:I),Lt.set([Q,ie],{force3D:!0}),w=Lt.quickSetter(Q,A.a,dn),ct=Lt.quickSetter(ie,A.a,dn))}if(x){var dt=x.vars.onUpdate,yt=x.vars.onUpdateParams;x.eventCallback("onUpdate",function(){C.update(0,0,1),dt&&dt.apply(x,yt||[])})}if(C.previous=function(){return te[te.indexOf(C)-1]},C.next=function(){return te[te.indexOf(C)+1]},C.revert=function(st,Mt){if(!Mt)return C.kill(!0);var rt=st!==!1||!C.enabled,At=Bn;rt!==C.isReverted&&(rt&&(et=Math.max(bt(),C.scroll.rec||0),ut=C.progress,tt=i&&i.progress()),pe&&[pe,ue,Q,ie].forEach(function(se){return se.style.display=rt?"none":"block"}),rt&&(Bn=C,C.update(rt)),d&&(!M||!C.isActive)&&(rt?Yw(d,_e,He):cp(d,_e,Bi(d),P)),rt||C.update(rt),Bn=At,C.isReverted=rt)},C.refresh=function(st,Mt,rt,At){if(!((Bn||!C.enabled)&&!Mt)){if(d&&st&&zi){xn(s,"scrollEnd",M_);return}!Kn&&K&&K(C),Bn=C,lt.tween&&!rt&&(lt.tween.kill(),lt.tween=0),Y&&Y.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(X){return X.vars.immediateRender&&X.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),C.isReverted||C.revert(!0,!0),C._subPinOffset=!1;var se=gt(),Yt=j(),Le=x?x.duration():ms(I,A),Ke=ce<=.01||!ce,De=0,Te=At||0,ve=Kr(rt)?rt.end:n.end,rn=n.endTrigger||u,Ee=Kr(rt)?rt.start:n.start||(n.start===0||!u?0:d?"0 0":"0 100%"),En=C.pinnedContainer=n.pinnedContainer&&Zn(n.pinnedContainer,C),oi=u&&Math.max(0,te.indexOf(C))||0,Ve=oi,Qe,on,ai,uo,an,We,Ti,ya,Kl,Gs,T,U,J;for($&&Kr(rt)&&(U=Lt.getProperty(Q,A.p),J=Lt.getProperty(ie,A.p));Ve-- >0;)We=te[Ve],We.end||We.refresh(0,1)||(Bn=C),Ti=We.pin,Ti&&(Ti===u||Ti===d||Ti===En)&&!We.isReverted&&(Gs||(Gs=[]),Gs.unshift(We),We.revert(!0,!0)),We!==te[Ve]&&(oi--,Ve--);for(kn(Ee)&&(Ee=Ee(C)),Ee=J0(Ee,"start",C),It=r_(Ee,u,se,A,bt(),pe,Q,C,Yt,V,B,Le,x,C._startClamp&&"_startClamp")||(d?-.001:0),kn(ve)&&(ve=ve(C)),yi(ve)&&!ve.indexOf("+=")&&(~ve.indexOf(" ")?ve=(yi(Ee)?Ee.split(" ")[0]:"")+ve:(De=Tu(ve.substr(2),se),ve=yi(Ee)?Ee:(x?Lt.utils.mapRange(0,x.duration(),x.scrollTrigger.start,x.scrollTrigger.end,It):It)+De,rn=u)),ve=J0(ve,"end",C),Ot=Math.max(It,r_(ve||(rn?"100% 0":Le),rn,se,A,bt()+De,ue,ie,C,Yt,V,B,Le,x,C._endClamp&&"_endClamp"))||-.001,De=0,Ve=oi;Ve--;)We=te[Ve]||{},Ti=We.pin,Ti&&We.start-We._pinPush<=It&&!x&&We.end>0&&(Qe=We.end-(C._startClamp?Math.max(0,We.start):We.start),(Ti===u&&We.start-We._pinPush<It||Ti===En)&&isNaN(Ee)&&(De+=Qe*(1-We.progress)),Ti===d&&(Te+=Qe));if(It+=De,Ot+=De,C._startClamp&&(C._startClamp+=De),C._endClamp&&!Kn&&(C._endClamp=Ot||-.001,Ot=Math.min(Ot,ms(I,A))),ce=Ot-It||(It-=.01)&&.001,Ke&&(ut=Lt.utils.clamp(0,1,Lt.utils.normalize(It,Ot,et))),C._pinPush=Te,pe&&De&&(Qe={},Qe[A.a]="+="+De,En&&(Qe[A.p]="-="+bt()),Lt.set([pe,ue],Qe)),d&&!(pp&&C.end>=ms(I,A)))Qe=Bi(d),uo=A===en,ai=bt(),me=parseFloat(Wt(A.a))+Te,!Le&&Ot>1&&(T=(L?Me.scrollingElement||Si:I).style,T={style:T,value:T["overflow"+A.a.toUpperCase()]},L&&Bi(Se)["overflow"+A.a.toUpperCase()]!=="scroll"&&(T.style["overflow"+A.a.toUpperCase()]="scroll")),cp(d,_e,Qe),k=Mu(d),on=Bs(d,!0),ya=B&&Os(I,uo?Fn:en)(),p?(P=[p+A.os2,ce+Te+dn],P.t=_e,Ve=p===nn?Iu(d,A)+ce+Te:0,Ve&&(P.push(A.d,Ve+dn),_e.style.flexBasis!=="auto"&&(_e.style.flexBasis=Ve+dn)),pa(P),En&&te.forEach(function(X){X.pin===En&&X.vars.pinSpacing!==!1&&(X._subPinOffset=!0)}),B&&bt(et)):(Ve=Iu(d,A),Ve&&_e.style.flexBasis!=="auto"&&(_e.style.flexBasis=Ve+dn)),B&&(an={top:on.top+(uo?ai-It:ya)+dn,left:on.left+(uo?ya:ai-It)+dn,boxSizing:"border-box",position:"fixed"},an[jr]=an["max"+ma]=Math.ceil(on.width)+dn,an[to]=an["max"+bp]=Math.ceil(on.height)+dn,an[Fi]=an[Fi+Fl]=an[Fi+Ul]=an[Fi+Bl]=an[Fi+Ol]="0",an[nn]=Qe[nn],an[nn+Fl]=Qe[nn+Fl],an[nn+Ul]=Qe[nn+Ul],an[nn+Bl]=Qe[nn+Bl],an[nn+Ol]=Qe[nn+Ol],Ze=$w(He,an,M),Kn&&bt(0)),i?(Kl=i._initted,rp(1),i.render(i.duration(),!0,!0),Ft=Wt(A.a)-me+ce+Te,q=Math.abs(ce-Ft)>1,B&&q&&Ze.splice(Ze.length-2,2),i.render(0,!0,!0),Kl||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),rp(0)):Ft=ce,T&&(T.value?T.style["overflow"+A.a.toUpperCase()]=T.value:T.style.removeProperty("overflow-"+A.a));else if(u&&bt()&&!x)for(on=u.parentNode;on&&on!==Se;)on._pinOffset&&(It-=on._pinOffset,Ot-=on._pinOffset),on=on.parentNode;Gs&&Gs.forEach(function(X){return X.revert(!1,!0)}),C.start=It,C.end=Ot,Pt=Ht=Kn?et:bt(),!x&&!Kn&&!_r&&(Pt<et&&bt(et),C.scroll.rec=0),C.revert(!1,!0),it=zn(),N&&(z=-1,N.restart(!0)),Bn=0,i&&D&&(i._initted||tt)&&i.progress()!==tt&&i.progress(tt||0,!0).render(i.time(),!0,!0),(Ke||ut!==C.progress||x||_||i&&!i._initted)&&(i&&!D&&(i._initted||ut||i.vars.immediateRender!==!1)&&i.totalProgress(x&&It<-.001&&!ut?Lt.utils.normalize(It,Ot,0):ut,!0),C.progress=Ke||(Pt-It)/ce===ut?0:ut),d&&p&&(_e._pinOffset=Math.round(C.progress*Ft)),Y&&Y.invalidate(),isNaN(U)||(U-=Lt.getProperty(Q,A.p),J-=Lt.getProperty(ie,A.p),bu(Q,A,U),bu(pe,A,U-(At||0)),bu(ie,A,J),bu(ue,A,J-(At||0))),Ke&&!Kn&&C.update(),h&&!Kn&&!we&&(we=!0,h(C),we=!1)}},C.getVelocity=function(){return(bt()-Ht)/(zn()-Cl)*1e3||0},C.endAnimation=function(){Rl(C.callbackAnimation),i&&(Y?Y.progress(1):i.paused()?D||Rl(i,C.direction<0,1):Rl(i,i.reversed()))},C.labelToScroll=function(st){return i&&i.labels&&(It||C.refresh()||It)+i.labels[st]/i.duration()*ce||0},C.getTrailing=function(st){var Mt=te.indexOf(C),rt=C.direction>0?te.slice(0,Mt).reverse():te.slice(Mt+1);return(yi(st)?rt.filter(function(At){return At.vars.preventOverlaps===st}):rt).filter(function(At){return C.direction>0?At.end<=It:At.start>=Ot})},C.update=function(st,Mt,rt){if(!(x&&!rt&&!st)){var At=Kn===!0?et:C.scroll(),se=st?0:(At-It)/ce,Yt=se<0?0:se>1?1:se||0,Le=C.progress,Ke,De,Te,ve,rn,Ee,En,oi;if(Mt&&(Ht=Pt,Pt=x?bt():At,y&&(St=mt,mt=i&&!D?i.totalProgress():Yt)),m&&d&&!Bn&&!gu&&zi&&(!Yt&&It<At+(At-Ht)/(zn()-Cl)*m?Yt=1e-4:Yt===1&&Ot>At+(At-Ht)/(zn()-Cl)*m&&(Yt=.9999)),Yt!==Le&&C.enabled){if(Ke=C.isActive=!!Yt&&Yt<1,De=!!Le&&Le<1,Ee=Ke!==De,rn=Ee||!!Yt!=!!Le,C.direction=Yt>Le?1:-1,C.progress=Yt,rn&&!Bn&&(Te=Yt&&!Le?0:Yt===1?1:Le===1?2:3,D&&(ve=!Ee&&O[Te+1]!=="none"&&O[Te+1]||O[Te],oi=i&&(ve==="complete"||ve==="reset"||ve in i))),R&&(Ee||oi)&&(oi||f||!i)&&(kn(R)?R(C):C.getTrailing(R).forEach(function(ai){return ai.endAnimation()})),D||(Y&&!Bn&&!gu?(Y._dp._time-Y._start!==Y._time&&Y.render(Y._dp._time-Y._start),Y.resetTo?Y.resetTo("totalProgress",Yt,i._tTime/i._tDur):(Y.vars.totalProgress=Yt,Y.invalidate().restart())):i&&i.totalProgress(Yt,!!(Bn&&(it||st)))),d){if(st&&p&&(_e.style[p+A.os2]=kt),!B)_t(Il(me+Ft*Yt));else if(rn){if(En=!st&&Yt>Le&&Ot+1>At&&At+1>=ms(I,A),M)if(!st&&(Ke||En)){var Ve=Bs(d,!0),Qe=At-It;o_(d,Se,Ve.top+(A===en?Qe:0)+dn,Ve.left+(A===en?0:Qe)+dn)}else o_(d,_e);pa(Ke||En?Ze:k),q&&Yt<1&&Ke||_t(me+(Yt===1&&!En?Ft:0))}}y&&!lt.tween&&!Bn&&!gu&&N.restart(!0),a&&(Ee||E&&Yt&&(Yt<1||!op))&&kl(a.targets).forEach(function(ai){return ai.classList[Ke||E?"add":"remove"](a.className)}),o&&!D&&!st&&o(C),rn&&!Bn?(D&&(oi&&(ve==="complete"?i.pause().totalProgress(1):ve==="reset"?i.restart(!0).pause():ve==="restart"?i.restart(!0):i[ve]()),o&&o(C)),(Ee||!op)&&(c&&Ee&&la(C,c),G[Te]&&la(C,G[Te]),E&&(Yt===1?C.kill(!1,1):G[Te]=0),Ee||(Te=Yt===1?1:3,G[Te]&&la(C,G[Te]))),S&&!Ke&&Math.abs(C.getVelocity())>(Ll(S)?S:2500)&&(Rl(C.callbackAnimation),Y?Y.progress(1):Rl(i,ve==="reverse"?1:!Yt,1))):D&&o&&!Bn&&o(C)}if(ct){var on=x?At/x.duration()*(x._caScrollDist||0):At;w(on+(Q._isFlipped?1:0)),ct(on)}xt&&xt(-At/x.duration()*(x._caScrollDist||0))}},C.enable=function(st,Mt){C.enabled||(C.enabled=!0,xn(I,"resize",Dl),L||xn(I,"scroll",ha),K&&xn(s,"refreshInit",K),st!==!1&&(C.progress=ut=0,Pt=Ht=z=bt()),Mt!==!1&&C.refresh())},C.getTween=function(st){return st&&lt?lt.tween:Y},C.setPositions=function(st,Mt,rt,At){if(x){var se=x.scrollTrigger,Yt=x.duration(),Le=se.end-se.start;st=se.start+Le*st/Yt,Mt=se.start+Le*Mt/Yt}C.refresh(!1,!1,{start:K0(st,rt&&!!C._startClamp),end:K0(Mt,rt&&!!C._endClamp)},At),C.update()},C.adjustPinSpacing=function(st){if(P&&st){var Mt=P.indexOf(A.d)+1;P[Mt]=parseFloat(P[Mt])+st+dn,P[1]=parseFloat(P[1])+st+dn,pa(P)}},C.disable=function(st,Mt){if(st!==!1&&C.revert(!0,!0),C.enabled&&(C.enabled=C.isActive=!1,Mt||Y&&Y.pause(),et=0,Ct&&(Ct.uncache=1),K&&_n(s,"refreshInit",K),N&&(N.pause(),lt.tween&&lt.tween.kill()&&(lt.tween=0)),!L)){for(var rt=te.length;rt--;)if(te[rt].scroller===I&&te[rt]!==C)return;_n(I,"resize",Dl),L||_n(I,"scroll",ha)}},C.kill=function(st,Mt){C.disable(st,Mt),Y&&!Mt&&Y.kill(),l&&delete mp[l];var rt=te.indexOf(C);rt>=0&&te.splice(rt,1),rt===Jn&&Au>0&&Jn--,rt=0,te.forEach(function(At){return At.scroller===C.scroller&&(rt=1)}),rt||Kn||_r||(C.scroll.rec=0),i&&(i.scrollTrigger=null,st&&i.revert({kill:!1}),Mt||i.kill()),pe&&[pe,ue,Q,ie].forEach(function(At){return At.parentNode&&At.parentNode.removeChild(At)}),zl===C&&(zl=0),d&&(Ct&&(Ct.uncache=1),rt=0,te.forEach(function(At){return At.pin===d&&rt++}),rt||(Ct.spacer=0)),n.onKill&&n.onKill(C)},te.push(C),C.enable(!1,!1),ft&&ft(C),i&&i.add&&!ce){var at=C.update;C.update=function(){C.update=at,Kt.cache++,It||Ot||C.refresh()},Lt.delayedCall(.01,C.update),ce=.01,It=Ot=0}else C.refresh();d&&qw()},s.register=function(n){return ua||(Lt=n||g_(),m_()&&window.document&&s.enable(),ua=Pl),ua},s.defaults=function(n){if(n)for(var i in n)yu[i]=n[i];return yu},s.disable=function(n,i){Pl=0,te.forEach(function(o){return o[i?"kill":"disable"](n)}),_n(ee,"wheel",ha),_n(Me,"scroll",ha),clearInterval(mu),_n(Me,"touchcancel",ps),_n(Se,"touchstart",ps),xu(_n,Me,"pointerdown,touchstart,mousedown",Q0),xu(_n,Me,"pointerup,touchend,mouseup",j0),Pu.kill(),_u(_n);for(var r=0;r<Kt.length;r+=3)vu(_n,Kt[r],Kt[r+1]),vu(_n,Kt[r],Kt[r+2])},s.enable=function(){if(ee=window,Me=document,Si=Me.documentElement,Se=Me.body,Lt){if(kl=Lt.utils.toArray,Nl=Lt.utils.clamp,fp=Lt.core.context||ps,rp=Lt.core.suppressOverwrites||ps,vp=ee.history.scrollRestoration||"auto",gp=ee.pageYOffset||0,Lt.core.globals("ScrollTrigger",s),Se){Pl=1,fa=document.createElement("div"),fa.style.height="100vh",fa.style.position="absolute",E_(),zw(),Ye.register(Lt),s.isTouch=Ye.isTouch,gr=Ye.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),dp=Ye.isTouch===1,xn(ee,"wheel",ha),xp=[ee,Me,Si,Se],Lt.matchMedia?(s.matchMedia=function(h){var f=Lt.matchMedia(),u;for(u in h)f.add(u,h[u]);return f},Lt.addEventListener("matchMediaInit",function(){w_(),Tp()}),Lt.addEventListener("matchMediaRevert",function(){return b_()}),Lt.addEventListener("matchMedia",function(){Qr(0,1),so("matchMedia")}),Lt.matchMedia().add("(orientation: portrait)",function(){return lp(),lp})):console.warn("Requires GSAP 3.11.0 or later"),lp(),xn(Me,"scroll",ha);var n=Se.hasAttribute("style"),i=Se.style,r=i.borderTopStyle,o=Lt.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Bs(Se),en.m=Math.round(a.top+en.sc())||0,Fn.m=Math.round(a.left+Fn.sc())||0,r?i.borderTopStyle=r:i.removeProperty("border-top-style"),n||(Se.setAttribute("style",""),Se.removeAttribute("style")),mu=setInterval(n_,250),Lt.delayedCall(.5,function(){return gu=0}),xn(Me,"touchcancel",ps),xn(Se,"touchstart",ps),xu(xn,Me,"pointerdown,touchstart,mousedown",Q0),xu(xn,Me,"pointerup,touchend,mouseup",j0),up=Lt.utils.checkPrefix("transform"),Ru.push(up),ua=zn(),Pu=Lt.delayedCall(.2,Qr).pause(),da=[Me,"visibilitychange",function(){var h=ee.innerWidth,f=ee.innerHeight;Me.hidden?(Z0=h,$0=f):(Z0!==h||$0!==f)&&Dl()},Me,"DOMContentLoaded",Qr,ee,"load",Qr,ee,"resize",Dl],_u(xn),te.forEach(function(h){return h.enable(0,1)}),l=0;l<Kt.length;l+=3)vu(_n,Kt[l],Kt[l+1]),vu(_n,Kt[l],Kt[l+2])}else if(Me){var c=function h(){s.enable(),Me.removeEventListener("DOMContentLoaded",h)};Me.addEventListener("DOMContentLoaded",c)}}},s.config=function(n){"limitCallbacks"in n&&(op=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(mu)||(mu=i)&&setInterval(n_,i),"ignoreMobileResize"in n&&(dp=s.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(_u(_n)||_u(xn,n.autoRefreshEvents||"none"),d_=(n.autoRefreshEvents+"").indexOf("resize")===-1)},s.scrollerProxy=function(n,i){var r=Zn(n),o=Kt.indexOf(r),a=no(r);~o&&Kt.splice(o,a?6:2),i&&(a?Qi.unshift(ee,i,Se,i,Si,i):Qi.unshift(r,i))},s.clearMatchMedia=function(n){te.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},s.isInViewport=function(n,i,r){var o=(yi(n)?Zn(n):n).getBoundingClientRect(),a=o[r?jr:to]*i||0;return r?o.right-a>0&&o.left+a<ee.innerWidth:o.bottom-a>0&&o.top+a<ee.innerHeight},s.positionInViewport=function(n,i,r){yi(n)&&(n=Zn(n));var o=n.getBoundingClientRect(),a=o[r?jr:to],l=i==null?a/2:i in Lu?Lu[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return r?(o.left+l)/ee.innerWidth:(o.top+l)/ee.innerHeight},s.killAll=function(n){if(te.slice(0).forEach(function(r){return r.vars.id!=="ScrollSmoother"&&r.kill()}),n!==!0){var i=io.killAll||[];io={},i.forEach(function(r){return r()})}},s})();$t.version="3.15.1";$t.saveStyles=function(s){return s?kl(s).forEach(function(t){if(t&&t.style){var e=vi.indexOf(t);e>=0&&vi.splice(e,5),vi.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Lt.core.getCache(t),fp())}}):vi};$t.revert=function(s,t){return Tp(!s,t)};$t.create=function(s,t){return new $t(s,t)};$t.refresh=function(s){return s?Dl(!0):(ua||$t.register())&&Qr(!0)};$t.update=function(s){return++Kt.cache&&zs(s===!0?2:0)};$t.clearScrollMemory=T_;$t.maxScroll=function(s,t){return ms(s,t?Fn:en)};$t.getScrollFunc=function(s,t){return Os(Zn(s),t?Fn:en)};$t.getById=function(s){return mp[s]};$t.getAll=function(){return te.filter(function(s){return s.vars.id!=="ScrollSmoother"})};$t.isScrolling=function(){return!!zi};$t.snapDirectional=wp;$t.addEventListener=function(s,t){var e=io[s]||(io[s]=[]);~e.indexOf(t)||e.push(t)};$t.removeEventListener=function(s,t){var e=io[s],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};$t.batch=function(s,t){var e=[],n={},i=t.interval||.016,r=t.batchMax||1e9,o=function(c,h){var f=[],u=[],d=Lt.delayedCall(i,function(){h(f,u),f=[],u=[]}).pause();return function(p){f.length||d.restart(!0),f.push(p.trigger),u.push(p),r<=f.length&&d.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&kn(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return kn(r)&&(r=r(),xn($t,"refresh",function(){return r=t.batchMax()})),kl(s).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push($t.create(c))}),e};var l_=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},hp=function s(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(Ye.isTouch?" pinch-zoom":""):"none",t===Si&&s(Se,e)},wu={auto:1,scroll:1},Kw=function(t){var e=t.event,n=t.target,i=t.axis,r=(e.changedTouches?e.changedTouches[0]:e).target,o=r._gsap||Lt.core.getCache(r),a=zn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;r&&r!==Se&&(r.scrollHeight<=r.clientHeight&&r.scrollWidth<=r.clientWidth||!(wu[(l=Bi(r)).overflowY]||wu[l.overflowX]));)r=r.parentNode;o._isScroll=r&&r!==n&&!no(r)&&(wu[(l=Bi(r)).overflowY]||wu[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},R_=function(t,e,n,i){return Ye.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&Kw,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&xn(Me,Ye.eventTypes[0],h_,!1,!0)},onDisable:function(){return _n(Me,Ye.eventTypes[0],h_,!0)}})},Qw=/(input|label|select|textarea)/i,c_,h_=function(t){var e=Qw.test(t.target.tagName);(e||c_)&&(t._gsapAllow=!0,c_=e)},jw=function(t){Kr(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,r=e.allowNestedScroll,o=e.onRelease,a,l,c=Zn(t.target)||Si,h=Lt.core.globals().ScrollSmoother,f=h&&h.get(),u=gr&&(t.content&&Zn(t.content)||f&&t.content!==!1&&!f.smooth()&&f.content()),d=Os(c,en),p=Os(c,Fn),_=1,m=(Ye.isTouch&&ee.visualViewport?ee.visualViewport.scale*ee.visualViewport.width:ee.outerWidth)/ee.innerWidth,g=0,v=kn(i)?function(){return i(a)}:function(){return i||2.8},E,y,M=R_(c,t.type,!0,r),b=function(){return y=!1},x=ps,S=ps,R=function(){l=ms(c,en),S=Nl(gr?1:0,l),n&&(x=Nl(0,ms(c,Fn))),E=eo},A=function(){u._gsap.y=Il(parseFloat(u._gsap.y)+d.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},D=function(){if(y){requestAnimationFrame(b);var $=Il(a.deltaY/2),V=S(d.v-$);if(u&&V!==d.v+d.offset){d.offset=V-d.v;var C=Il((parseFloat(u&&u._gsap.y)||0)-d.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+C+", 0, 1)",u._gsap.y=C+"px",d.cacheID=Kt.cache,zs()}return!0}d.offset&&A(),y=!0},I,F,L,B,G=function(){R(),I.isActive()&&I.vars.scrollY>l&&(d()>l?I.progress(1)&&d(l):I.resetTo("scrollY",l))};return u&&Lt.set(u,{y:"+=0"}),t.ignoreCheck=function(O){return gr&&O.type==="touchmove"&&D(O)||_>1.05&&O.type!=="touchstart"||a.isGesturing||O.touches&&O.touches.length>1},t.onPress=function(){y=!1;var O=_;_=Il((ee.visualViewport&&ee.visualViewport.scale||1)/m),I.pause(),O!==_&&hp(c,_>1.01?!0:n?!1:"x"),F=p(),L=d(),R(),E=eo},t.onRelease=t.onGestureStart=function(O,$){if(d.offset&&A(),!$)B.restart(!0);else{Kt.cache++;var V=v(),C,K;n&&(C=p(),K=C+V*.05*-O.velocityX/.227,V*=l_(p,C,K,ms(c,Fn)),I.vars.scrollX=x(K)),C=d(),K=C+V*.05*-O.velocityY/.227,V*=l_(d,C,K,ms(c,en)),I.vars.scrollY=S(K),I.invalidate().duration(V).play(.01),(gr&&I.vars.scrollY>=l||C>=l-1)&&Lt.to({},{onUpdate:G,duration:V})}o&&o(O)},t.onWheel=function(){I._ts&&I.pause(),zn()-g>1e3&&(E=0,g=zn())},t.onChange=function(O,$,V,C,K){if(eo!==E&&R(),$&&n&&p(x(C[2]===$?F+(O.startX-O.x):p()+$-C[1])),V){d.offset&&A();var gt=K[2]===V,j=gt?L+O.startY-O.y:d()+V-K[1],z=S(j);gt&&j!==z&&(L+=z-j),d(z)}(V||$)&&zs()},t.onEnable=function(){hp(c,n?!1:"x"),$t.addEventListener("refresh",G),xn(ee,"resize",G),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=p.smooth=!1),M.enable()},t.onDisable=function(){hp(c,!0),_n(ee,"resize",G),$t.removeEventListener("refresh",G),M.kill()},t.lockAxis=t.lockAxis!==!1,a=new Ye(t),a.iOS=gr,gr&&!d()&&d(1),gr&&Lt.ticker.add(ps),B=a._dc,I=Lt.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:A_(d,d(),function(){return I.pause()})},onUpdate:zs,onComplete:B.vars.onComplete}),a};$t.sort=function(s){if(kn(s))return te.sort(s);var t=ee.pageYOffset||0;return $t.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+ee.innerHeight}),te.sort(s||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};$t.observe=function(s){return new Ye(s)};$t.normalizeScroll=function(s){if(typeof s>"u")return $n;if(s===!0&&$n)return $n.enable();if(s===!1){$n&&$n.kill(),$n=s;return}var t=s instanceof Ye?s:jw(s);return $n&&$n.target===t.target&&$n.kill(),no(t.target)&&($n=t),t};$t.core={_getVelocityProp:pu,_inputObserver:R_,_scrollers:Kt,_proxies:Qi,bridge:{ss:function(){zi||so("scrollStart"),zi=zn()},ref:function(){return Bn}}};g_()&&Lt.registerPlugin($t);var Hl,Vl,C_=typeof Symbol=="function"?Symbol():"_split",Ap,tT=()=>Ap||Ou.register(window.gsap),P_=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter:0,Wl=s=>s?typeof s=="string"?Wl(document.querySelectorAll(s)):"length"in s?Array.from(s).reduce((t,e)=>(typeof e=="string"?t.push(...Wl(e)):t.push(e),t),[]):[s]:[],I_=s=>Wl(s).filter(t=>t&&t.nodeType===1),Nu=[],Ep=function(){},eT={add:s=>s()},nT=/\s+/g,L_=new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.","gu"),Uu={left:0,top:0,width:0,height:0},iT=(s,t)=>{for(;++t<s.length&&s[t]===Uu;);return s[t]||Uu},D_=({element:s,html:t,ariaL:e,ariaH:n})=>{s.innerHTML=t,e?s.setAttribute("aria-label",e):s.removeAttribute("aria-label"),n?s.setAttribute("aria-hidden",n):s.removeAttribute("aria-hidden")},N_=(s,t)=>{if(t){let e=new Set(s.join("").match(t)||Nu),n=s.length,i,r,o,a;if(e.size)for(;--n>-1;){r=s[n];for(o of e)if(o.startsWith(r)&&o.length>r.length){for(i=0,a=r;o.startsWith(a+=s[n+ ++i])&&a.length<o.length;);if(i&&a.length===o.length){s[n]=o,s.splice(n+1,i);break}}}}return s},U_=s=>window.getComputedStyle(s).display==="inline"&&(s.style.display="inline-block"),ga=(s,t,e)=>t.insertBefore(typeof s=="string"?document.createTextNode(s):s,e),Rp=(s,t,e)=>{let n=t[s+"sClass"]||"",{tag:i="div",aria:r="auto",propIndex:o=!1}=t,a=s==="line"?"block":"inline-block",l=n.indexOf("++")>-1,c=h=>{let f=document.createElement(i),u=e.length+1;return n&&(f.className=n+(l?" "+n+u:"")),o&&f.style.setProperty("--"+s,u+""),r!=="none"&&f.setAttribute("aria-hidden","true"),i!=="span"&&(f.style.position="relative",f.style.display=a),f.textContent=h,e.push(f),f};return l&&(n=n.replace("++","")),c.collection=e,c},sT=(s,t,e,n)=>{let i=Rp("line",e,n),r=window.getComputedStyle(s).textAlign||"left";return(o,a)=>{let l=i("");for(l.style.textAlign=r,s.insertBefore(l,t[o]);o<a;o++)l.appendChild(t[o]);l.normalize()}},O_=(s,t,e,n,i,r,o,a,l,c)=>{var h;let f=Array.from(s.childNodes),u=0,{wordDelimiter:d,reduceWhiteSpace:p=!0,prepareText:_}=t,m=s.getBoundingClientRect(),g=m,v=!p&&window.getComputedStyle(s).whiteSpace.substring(0,3)==="pre",E=r&&c&&window.getComputedStyle(s).direction==="rtl",y=0,M=e.collection,b,x,S,R,A,D,I,F,L,B,G,O,$,V,C,K,gt,j;for(typeof d=="object"?(S=d.delimiter||d,x=d.replaceWith||""):x=d===""?"":d||" ",b=x!==" ";u<f.length;u++)if(R=f[u],R.nodeType===3){for(C=R.textContent||"",p?C=C.replace(nT," "):v&&(C=C.replace(/\n/g,x+`
`)),_&&(C=_(C,s)),R.textContent=C,A=x||S?C.split(S||x):C.match(a)||Nu,gt=A[A.length-1],F=b?gt.slice(-1)===" ":!gt,gt||A.pop(),g=m,I=b?A[0].charAt(0)===" ":!A[0],I&&ga(" ",s,R),A[0]||A.shift(),N_(A,l),r&&c||(R.textContent=""),L=1;L<=A.length;L++)if(K=A[L-1],!p&&v&&K.charAt(0)===`
`&&((h=R.previousSibling)==null||h.remove(),ga(document.createElement("br"),s,R),K=K.slice(1)),!p&&K==="")ga(x,s,R);else if(K===" ")s.insertBefore(document.createTextNode(" "),R);else{if(b&&K.charAt(0)===" "&&ga(" ",s,R),y&&L===1&&!I&&M.indexOf(y.parentNode)>-1?(D=M[M.length-1],D.appendChild(document.createTextNode(n?"":K))):(D=e(n?"":K),ga(D,s,R),y&&L===1&&!I&&D.insertBefore(y,D.firstChild)),n){if(G=P_?N_([...P_.segment(K)].map(z=>z.segment),l):K.match(a)||Nu,l){let z=K.match(l);z&&z.some(it=>G.indexOf(it)<0)&&(G=K.match(a)||Nu)}for(j=0;j<G.length;j++)D.appendChild(G[j]===" "?document.createTextNode(" "):n(G[j]))}if(r&&c){if(C=R.textContent=C.substring(K.length+1,C.length),B=D.getBoundingClientRect(),B.top>g.top&&(E?B.left>=g.left:B.left<=g.left)){for(O=s.cloneNode(),$=s.childNodes[0];$&&$!==D;)V=$,$=$.nextSibling,O.appendChild(V);s.parentNode.insertBefore(O,s),i&&U_(O)}g=B}(L<A.length||F)&&ga(L>=A.length?" ":b&&K.slice(-1)===" "?" "+x:x,s,R)}s.removeChild(R),y=0}else R.nodeType===1&&(o&&o.indexOf(R)>-1?(M.indexOf(R.previousSibling)>-1&&M[M.length-1].appendChild(R),y=R):(O_(R,t,e,n,i,r,o,a,l,!0),y=0),i&&U_(R))},F_=class B_{constructor(t,e){this.isSplit=!1,tT(),this.elements=I_(t),this.chars=[],this.words=[],this.lines=[],this.masks=[],this.vars=e,this.elements.forEach(r=>{var o;e.overwrite!==!1&&((o=r[C_])==null||o._data.orig.filter(({element:a})=>a===r).forEach(D_)),r[C_]=this}),this._split=()=>this.isSplit&&this.split(this.vars);let n=[],i=()=>{let r=n.length,o;for(;r--;){o=n[r];let a=o.element.offsetWidth;if(a!==o.width){o.width=a,this._split();return}}};this._data={orig:n,obs:typeof ResizeObserver<"u"&&new ResizeObserver(()=>{clearTimeout(this._data.t),this._data.t=setTimeout(i,200)})},Ep(this),this.split(e)}split(t){return(this._ctx||eT).add(()=>{this.isSplit&&this.revert(),this.vars=t=t||this.vars||{};let{type:e="chars,words,lines",aria:n="auto",deepSlice:i=!0,smartWrap:r,onSplit:o,autoSplit:a=!1,specialChars:l,mask:c}=this.vars,h=e.indexOf("lines")>-1,f=e.indexOf("chars")>-1,u=e.indexOf("words")>-1,d=f&&!u&&!h,p=l&&("push"in l?new RegExp("(?:"+l.join("|")+")","gu"):l),_=p?new RegExp(p.source+"|"+L_.source,"gu"):L_,m=!!t.ignore&&I_(t.ignore),{orig:g,animTime:v,obs:E}=this._data,y;(f||u||h)&&(this.elements.forEach((M,b)=>{g[b]={element:M,html:M.innerHTML,ariaL:M.getAttribute("aria-label"),ariaH:M.getAttribute("aria-hidden")},n==="auto"?M.setAttribute("aria-label",(M.textContent||"").trim()):n==="hidden"&&M.setAttribute("aria-hidden","true");let x=[],S=[],R=[],A=f?Rp("char",t,x):null,D=Rp("word",t,S),I,F,L,B;if(O_(M,t,D,A,d,i&&(h||d),m,_,p,!1),h){let G=Wl(M.childNodes),O=sT(M,G,t,R),$,V=[],C=0,K=window.getComputedStyle(M).direction==="rtl",gt=G.map(it=>it.nodeType===1?it.getBoundingClientRect():Uu),j=Uu,z;for(I=0;I<G.length;I++)$=G[I],$.nodeType===1&&($.nodeName==="BR"?((!I||G[I-1].nodeName!=="BR")&&(V.push($),O(C,I+1)),C=I+1,j=iT(gt,I)):(z=gt[I],I&&z.top>j.top&&(K?z.left+z.width>j.left+1:z.left<j.left+j.width-1)&&(O(C,I),C=I),j=z));C<I&&O(C,I),V.forEach(it=>{var ut;return(ut=it.parentNode)==null?void 0:ut.removeChild(it)})}if(!u){for(I=0;I<S.length;I++)if(F=S[I],f||!F.nextSibling||F.nextSibling.nodeType!==3)if(r&&!h){for(L=document.createElement("span"),L.style.whiteSpace="nowrap";F.firstChild;)L.appendChild(F.firstChild);F.replaceWith(L)}else F.replaceWith(...F.childNodes);else B=F.nextSibling,B&&B.nodeType===3&&(B.textContent=(F.textContent||"")+(B.textContent||""),F.remove());S.length=0,M.normalize()}this.lines.push(...R),this.words.push(...S),this.chars.push(...x)}),c&&this[c]&&this.masks.push(...this[c].map(M=>{let b=M.cloneNode();return M.replaceWith(b),b.appendChild(M),M.className&&(b.className=M.className.trim().split(" ").map(x=>x+"-mask").join(" ")),b.style.overflow="clip",b.style.verticalAlign="top",b}))),this.isSplit=!0,Vl&&h&&a&&Vl.addEventListener("loadingdone",this._split),(y=o&&o(this))&&y.totalTime&&(this._data.anim=v?y.totalTime(v):y),h&&a&&this.elements.forEach((M,b)=>{g[b].width=M.offsetWidth,E&&E.observe(M)})}),this}kill(){let{obs:t,t:e}=this._data;t&&t.disconnect(),clearTimeout(e),Vl?.removeEventListener("loadingdone",this._split)}revert(){var t,e;if(this.isSplit){let{orig:n,anim:i}=this._data;this.kill(),n.forEach(D_),this.chars.length=this.words.length=this.lines.length=n.length=this.masks.length=0,this.isSplit=!1,i&&(this._data.animTime=i.totalTime(),i.revert()),(e=(t=this.vars).onRevert)==null||e.call(t,this)}return this}static create(t,e){return new B_(t,e)}static register(t){Hl=Hl||t||window.gsap,Hl&&(Wl=Hl.utils.toArray,Ep=Hl.core.context||Ep),!Ap&&window.innerWidth>0&&(Vl=document.fonts,Ap=!0)}};F_.version="3.15.1";var Ou=F_;var z_="1.3.27";function H_(s,t,e){return Math.max(s,Math.min(t,e))}function rT(s,t,e){return(1-e)*s+e*t}function oT(s,t,e,n){return rT(s,t,1-Math.exp(-e*n))}function aT(s,t){return(s%t+t)%t}var lT=class{constructor(){zt(this,"isRunning",!1);zt(this,"value",0);zt(this,"from",0);zt(this,"to",0);zt(this,"currentTime",0);zt(this,"lerp");zt(this,"duration");zt(this,"easing");zt(this,"onUpdate")}advance(s){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=s;let e=H_(0,this.currentTime/this.duration,1);t=e>=1;let n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=oT(this.value,this.to,this.lerp*60,s),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(s,t,{lerp:e,duration:n,easing:i,onStart:r,onUpdate:o}){this.from=this.value=s,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=o}};function cT(s,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,s.apply(this,n)},t)}}var hT=class{constructor(s,t,{autoResize:e=!0,debounce:n=250}={}){zt(this,"width",0);zt(this,"height",0);zt(this,"scrollHeight",0);zt(this,"scrollWidth",0);zt(this,"debouncedResize");zt(this,"wrapperResizeObserver");zt(this,"contentResizeObserver");zt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});zt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});zt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=s,this.content=t,e&&(this.debouncedResize=cT(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},V_=class{constructor(){zt(this,"events",{})}emit(s,...t){let e=this.events[s]||[];for(let n=0,i=e.length;n<i;n++)e[n]?.(...t)}on(s,t){return this.events[s]?this.events[s].push(t):this.events[s]=[t],()=>{this.events[s]=this.events[s]?.filter(e=>t!==e)}}off(s,t){this.events[s]=this.events[s]?.filter(e=>t!==e)}destroy(){this.events={}}},uT=100/6,xr={passive:!1};function k_(s,t){return s===1?uT:s===2?t:1}var dT=class{constructor(s,t={wheelMultiplier:1,touchMultiplier:1}){zt(this,"touchStart",{x:0,y:0});zt(this,"lastDelta",{x:0,y:0});zt(this,"window",{width:0,height:0});zt(this,"emitter",new V_);zt(this,"onTouchStart",s=>{let{clientX:t,clientY:e}=s.targetTouches?s.targetTouches[0]:s;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:s})});zt(this,"onTouchMove",s=>{let{clientX:t,clientY:e}=s.targetTouches?s.targetTouches[0]:s,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:s})});zt(this,"onTouchEnd",s=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:s})});zt(this,"onWheel",s=>{let{deltaX:t,deltaY:e,deltaMode:n}=s,i=k_(n,this.window.width),r=k_(n,this.window.height);t*=i,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:s})});zt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=s,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,xr),this.element.addEventListener("touchstart",this.onTouchStart,xr),this.element.addEventListener("touchmove",this.onTouchMove,xr),this.element.addEventListener("touchend",this.onTouchEnd,xr)}on(s,t){return this.emitter.on(s,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,xr),this.element.removeEventListener("touchstart",this.onTouchStart,xr),this.element.removeEventListener("touchmove",this.onTouchMove,xr),this.element.removeEventListener("touchend",this.onTouchEnd,xr)}},G_=s=>Math.min(1,1.001-2**(-10*s)),W_=class{constructor({wrapper:s=window,content:t=document.documentElement,eventsTarget:e=s,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:h=!1,orientation:f="vertical",gestureOrientation:u=f==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:p=1,autoResize:_=!0,prevent:m,virtualScroll:g,overscroll:v=!0,autoRaf:E=!1,anchors:y=!1,autoToggle:M=!1,allowNestedScroll:b=!1,__experimental__naiveDimensions:x=!1,naiveDimensions:S=x,stopInertiaOnNavigate:R=!1,respectReducedMotion:A=!0}={}){zt(this,"_isScrolling",!1);zt(this,"_isStopped",!1);zt(this,"_isLocked",!1);zt(this,"_preventNextNativeScrollEvent",!1);zt(this,"_resetVelocityTimeout",null);zt(this,"_rafId",null);zt(this,"_isDraggingSelection",!1);zt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));zt(this,"isTouching");zt(this,"isIos");zt(this,"time",0);zt(this,"userData",{});zt(this,"lastVelocity",0);zt(this,"velocity",0);zt(this,"direction",0);zt(this,"options");zt(this,"targetScroll");zt(this,"animatedScroll");zt(this,"animate",new lT);zt(this,"emitter",new V_);zt(this,"dimensions");zt(this,"virtualScroll");zt(this,"onScrollEnd",s=>{s instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&s.stopPropagation()});zt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});zt(this,"onTransitionEnd",s=>{s.propertyName?.includes("overflow")&&s.target===this.rootElement&&this.checkOverflow()});zt(this,"onClick",s=>{let t=s.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){let n=t.find(i=>e.host===i.host&&e.pathname===i.pathname&&i.hash);if(n){let i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(n.hash);this.scrollTo(r,i);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});zt(this,"onPointerDown",s=>{s.button===1&&this.reset()});zt(this,"onVirtualScroll",s=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(s)===!1)return;let{deltaX:t,deltaY:e,event:n}=s;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;let i=n.type.includes("touch"),r=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";let o=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));let c=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(p=>p instanceof HTMLElement&&(typeof c=="function"&&c?.(p)||p.hasAttribute?.("data-lenis-prevent")||h==="vertical"&&p.hasAttribute?.("data-lenis-prevent-vertical")||h==="horizontal"&&p.hasAttribute?.("data-lenis-prevent-horizontal")||i&&p.hasAttribute?.("data-lenis-prevent-touch")||r&&p.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(p,{deltaX:t,deltaY:e}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=e;this.options.gestureOrientation==="both"?f=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(f=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();let u=i&&this.options.syncTouch,d=i&&n.type==="touchend";d&&(f=Math.sign(f)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+f,{programmatic:!1,...u?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});zt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){let s=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-s,this.direction=Math.sign(this.animatedScroll-s),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});zt(this,"raf",s=>{let t=s-(this.time||s);this.time=s,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=z_,window.lenis||(window.lenis={}),window.lenis.version=z_,f==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!s||s===document.documentElement)&&(s=window),typeof a=="number"&&typeof l!="function"?l=G_:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:s,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:h,gestureOrientation:u,orientation:f,touchMultiplier:d,wheelMultiplier:p,autoResize:_,prevent:m,virtualScroll:g,overscroll:v,autoRaf:E,anchors:y,autoToggle:M,allowNestedScroll:b,naiveDimensions:S,stopInertiaOnNavigate:R,respectReducedMotion:A},this.dimensions=new hT(s,t,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new dT(e,{touchMultiplier:d,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(s,t){return this.emitter.on(s,t)}off(s,t){return this.emitter.off(s,t)}get overflow(){let s=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[s]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(s){this.isHorizontal?this.options.wrapper.scrollTo({left:s,behavior:"instant"}):this.options.wrapper.scrollTo({top:s,behavior:"instant"})}isTouchOnSelectionHandle(s){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let e=s.targetTouches[0]??s.changedTouches[0];if(!e)return!1;let n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;let i=n[0],r=n[n.length-1],o=40,a=Math.hypot(e.clientX-i.left,e.clientY-i.top)<=o,l=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(s,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:i=!0,lerp:r=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:a=i?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:f}={}){if(this.prefersReducedMotion&&(i?e=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!h)return;let u=s,d=t;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let p=null;if(typeof u=="string"?(p=u.startsWith("#")?document.getElementById(u.slice(1)):document.querySelector(u),p||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof Element&&(p=u),p){if(this.options.wrapper!==window){let y=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?y.left:y.top}let _=p.getBoundingClientRect(),m=getComputedStyle(p),g=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),v=getComputedStyle(this.rootElement),E=this.isHorizontal?Number.parseFloat(v.scrollPaddingLeft):Number.parseFloat(v.scrollPaddingTop);u=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(g)?0:g)-(Number.isNaN(E)?0:E)}}if(typeof u=="number"){if(u+=d,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;let p=u-this.animatedScroll;p>this.limit/2?u-=this.limit:p<-this.limit/2&&(u+=this.limit)}}else u=H_(0,u,this.limit);if(u===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=f??{},e){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=u),typeof o=="number"&&typeof a!="function"?a=G_:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,u,{duration:o,easing:a,lerp:r,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(p,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=p-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=p,this.setScroll(this.scroll),i&&(this.targetScroll=p),_||this.emit(),_&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(s,{deltaX:t,deltaY:e}){let n=Date.now();s._lenis||(s._lenis={});let i=s._lenis,r,o,a,l,c,h,f,u,d,p;if(n-(i.time??0)>2e3){i.time=Date.now();let b=window.getComputedStyle(s);if(i.computedStyle=b,r=["auto","overlay","scroll"].includes(b.overflowX),o=["auto","overlay","scroll"].includes(b.overflowY),c=["auto"].includes(b.overscrollBehaviorX),h=["auto"].includes(b.overscrollBehaviorY),i.hasOverflowX=r,i.hasOverflowY=o,!(r||o))return!1;f=s.scrollWidth,u=s.scrollHeight,d=s.clientWidth,p=s.clientHeight,a=f>d,l=u>p,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=f,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=p,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=h}else a=i.isScrollableX,l=i.isScrollableY,r=i.hasOverflowX,o=i.hasOverflowY,f=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,p=i.clientHeight,c=i.hasOverscrollBehaviorX,h=i.hasOverscrollBehaviorY;if(!(r&&a||o&&l))return!1;let _=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical",m,g,v,E,y,M;if(_==="horizontal")m=Math.round(s.scrollLeft),g=f-d,v=t,E=r,y=a,M=c;else if(_==="vertical")m=Math.round(s.scrollTop),g=u-p,v=e,E=o,y=l,M=h;else return!1;return!M&&(m>=g||m<=0)?!0:(v>0?m<g:m>0)&&E&&y}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){let s=this.options.wrapper;return this.isHorizontal?s.scrollX??s.scrollLeft:s.scrollY??s.scrollTop}get scroll(){return this.options.infinite?aT(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(s){this._isScrolling!==s&&(this._isScrolling=s,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(s){this._isStopped!==s&&(this._isStopped=s,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(s){this._isLocked!==s&&(this._isLocked=s,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let s="lenis";return this.options.autoToggle&&(s+=" lenis-autoToggle"),this.isStopped&&(s+=" lenis-stopped"),this.isLocked&&(s+=" lenis-locked"),this.isScrolling&&(s+=" lenis-scrolling"),this.isScrolling==="smooth"&&(s+=" lenis-smooth"),s}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(s=>{this.rootElement.classList.add(s)})}cleanUpClassName(){for(let s of Array.from(this.rootElement.classList))(s==="lenis"||s.startsWith("lenis-"))&&this.rootElement.classList.remove(s)}};function q_(s,t=!1){let e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new Pi;l.morphTargetsRelative=a;let c=0;for(let h=0;h<s.length;++h){let f=s[h],u=0,d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in f.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[p].length!==s[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;o[p]===void 0&&(o[p]=[]),o[p].push(f.morphAttributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(t){let p;if(e)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0,f=[];for(let u=0;u<s.length;++u){let d=s[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=s[u].attributes.position.count}l.setIndex(f)}for(let h in r){let f=X_(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(let h in o){let f=o[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][u]);let p=X_(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function X_(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new hi(o,e,n),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let f=l/e;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<e;p++){let _=h.getComponent(u,p);a.setComponent(u+f,p,_)}}else o.set(h.array,l);l+=h.count*e}return i!==void 0&&(a.gpuType=i),a}var H={eg:{x0:0,x1:17,z0:0,z1:10.5},og:{x0:6,x1:20,z0:0,z1:11.5},wall:.3,inner:.15,egCeil:3,ogFloor:3.3,ogCeil:6.1,roofTop:6.5,attika:6.7,spineZ0:3.4,spineZ1:3.6,spineX1:13.4,door:{x0:14.3,x1:15.6,h:2.7},stair:{x0:7,x1:11.93,z0:3.6,z1:4.7,risers:18},void:{x0:6.3,x1:12.1,z0:3.6,z1:4.8},corrZ0:3.6,corrZ1:4.8,bedDoor:{x0:12.3,x1:13.3},slider:{z0:6.8,z1:9.6},skylight:{x0:6.6,x1:11.8,z0:3.65,z1:4.75},pool:{x0:1.5,x1:13.5,z0:13.2,z1:16.2}},vr={eg:[{id:"wohnen",name:"Wohnen \xB7 Essen \xB7 Kochen",short:"Wohnen",x0:.3,x1:16.7,z0:3.6,z1:10.5,minus:5.4},{id:"diele",name:"Diele",x0:13.4,x1:16.7,z0:.3,z1:3.6},{id:"gast",name:"Gast / Arbeiten",x0:.3,x1:5.9,z0:.3,z1:3.4},{id:"hwr",name:"Speis / Hauswirtschaft",short:"Speis / HWR",x0:6.05,x1:9.6,z0:.3,z1:3.4},{id:"wc",name:"Duschbad G\xE4ste",x0:9.75,x1:13.25,z0:.3,z1:3.4}],og:[{id:"schlafen",name:"Schlafen mit Ankleide",x0:6.3,x1:13.6,z0:4.9,z1:11.2},{id:"badE",name:"Bad Eltern",x0:13.75,x1:16.4,z0:4.9,z1:11.2},{id:"kind2",name:"Kind 2",x0:16.55,x1:19.7,z0:4.9,z1:11.2},{id:"kind1",name:"Kind 1",x0:6.3,x1:12.9,z0:.3,z1:3.4},{id:"bad",name:"Bad",x0:13.05,x1:16,z0:.3,z1:3.4},{id:"studio",name:"Arbeiten",x0:16.15,x1:19.7,z0:.3,z1:3.4},{id:"flur",name:"Flur",x0:12.1,x1:19.7,z0:3.6,z1:4.8}],dach:[{id:"terrasse",name:"Dachterrasse",x0:.15,x1:5.85,z0:.15,z1:10.35,f:.25}]};function yr(s){return(s.x1-s.x0)*(s.z1-s.z0)-(s.minus||0)}function Cp(){let s=o=>o.reduce((a,l)=>a+yr(l)*(l.f??1),0),t=s(vr.eg),e=s(vr.og),n=s(vr.dach),i=(H.eg.x1-H.eg.x0)*(H.eg.z1-H.eg.z0),r=(H.og.x1-H.og.x0)*(H.og.z1-H.og.z0);return{eg:t,og:e,dach:n,wohn:t+e+n,bgf:i+r,terrasseVoll:yr(vr.dach[0])}}function ji(s=1){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ro(s,t=s){let e=document.createElement("canvas");return e.width=s,e.height=t,e}function Mi(s,t,e,n,i,r,o=!0){let a=n,l=ro(a+2,a+2),c=l.getContext("2d"),h=c.createImageData(a+2,a+2),f=[];for(let p=0;p<a;p++)for(let _=0;_<a;_++)f.push(r());for(let p=0;p<a+2;p++)for(let _=0;_<a+2;_++){let m=f[(p-1+a)%a*a+(_-1+a)%a],g=(p*(a+2)+_)*4,v=o?0:255;h.data[g]=h.data[g+1]=h.data[g+2]=v,h.data[g+3]=Math.round(m*255)}c.putImageData(h,0,0),s.save(),s.globalAlpha=i,s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high";let u=t/a,d=e/a;s.drawImage(l,-u*1.5,-d*1.5,t+u*3,e+d*3),s.restore()}function Xl(s,t,e,n,i){let r=s.getImageData(0,0,t,e),o=r.data;for(let a=0;a<o.length;a+=4){let l=(i()-.5)*n;o[a]+=l,o[a+1]+=l,o[a+2]+=l}s.putImageData(r,0,0)}function Sr(s,{srgb:t=!0,repeat:e=!0,aniso:n=8}={}){let i=new ka(s);return t&&(i.colorSpace=Sn),e&&(i.wrapS=i.wrapT=Co),i.anisotropy=n,i.generateMipmaps=!0,i.minFilter=Yi,i.needsUpdate=!0,i}function oo(s=1024,t={}){let{base:e=[190,186,179],seed:n=7,ties:i=!0,joints:r=!0,light:o=0}=t,a=ji(n),l=ro(s),c=l.getContext("2d"),h=e.map(f=>f+o);if(c.fillStyle=`rgb(${h[0]},${h[1]},${h[2]})`,c.fillRect(0,0,s,s),r)for(let f=0;f<2;f++){let u=(a()-.5)*.08;c.fillStyle=u>0?`rgba(255,255,255,${u})`:`rgba(0,0,0,${-u})`,c.fillRect(0,f*s/2,s,s/2)}Mi(c,s,s,3,.08,a),Mi(c,s,s,6,.1,a),Mi(c,s,s,14,.07,a,!1),Mi(c,s,s,40,.06,a),Mi(c,s,s,120,.05,a);for(let f=0;f<1400;f++){let u=a()*s,d=a()*s,p=.4+a()*1.3;c.fillStyle=`rgba(40,38,35,${.15+a()*.35})`,c.beginPath(),c.arc(u,d,p,0,Math.PI*2),c.fill()}if(r&&(c.fillStyle="rgba(60,57,52,0.45)",c.fillRect(0,0,s,1.5),c.fillRect(0,s/2-.75,s,1.5),c.fillRect(0,0,1.5,s),c.fillStyle="rgba(255,255,255,0.18)",c.fillRect(0,2,s,1),c.fillRect(0,s/2+1,s,1)),i){let f=[.125,.625],u=[.125,.375,.625,.875];for(let d of f)for(let p of u){let _=d*s,m=p*s,g=s*.0065,v=c.createRadialGradient(_,m,0,_,m,g*1.8);v.addColorStop(0,"rgba(45,43,40,0.95)"),v.addColorStop(.55,"rgba(70,67,62,0.85)"),v.addColorStop(.62,"rgba(225,222,215,0.5)"),v.addColorStop(1,"rgba(225,222,215,0)"),c.fillStyle=v,c.beginPath(),c.arc(_,m,g*1.8,0,Math.PI*2),c.fill()}}return Xl(c,s,s,10,a),l}function Fu(s=1024,t={}){let{base:e=[176,132,92],boards:n=8,seed:i=3,contrast:r=1,joints:o=!0}=t,a=ji(i),l=ro(s),c=l.getContext("2d"),h=s/n;for(let f=0;f<n;f++){let u=(a()-.5)*34*r,d=e[0]+u,p=e[1]+u*.85,_=e[2]+u*.7,m=a()*s;for(let v=0;v<2;v++){let E=v?(a()-.5)*16*r:0;c.fillStyle=`rgb(${d+E},${p+E},${_+E})`;let y=v?m:0,M=v?s:m;c.fillRect(f*h,y,h,M-y)}let g=10+Math.floor(a()*10);for(let v=0;v<g;v++){let E=f*h+a()*h,y=2+a()*6,M=.004+a()*.01,b=a()*10;c.strokeStyle=`rgba(${a()<.5?"70,45,25":"255,235,210"},${(.05+a()*.12)*r})`,c.lineWidth=.6+a()*1.6,c.beginPath();for(let x=0;x<=s;x+=8){let S=E+Math.sin(x*M+b)*y;x===0?c.moveTo(S,x):c.lineTo(S,x)}c.stroke()}o&&(c.fillStyle="rgba(40,28,18,0.55)",c.fillRect(f*h,0,1.5,s),c.fillRect(f*h,m,h,1.5))}return Mi(c,s,s,8,.05,a),Xl(c,s,s,8,a),l}function fT(s=512){let t=ji(11),e=ro(s),n=e.getContext("2d");n.fillStyle="rgb(86,104,62)",n.fillRect(0,0,s,s),Mi(n,s,s,4,.18,t),Mi(n,s,s,10,.12,t,!1),Mi(n,s,s,30,.12,t);for(let i=0;i<9e3;i++){let r=t()*s,o=t()*s;n.fillStyle=t()<.5?"rgba(40,58,28,0.35)":"rgba(150,170,100,0.25)",n.fillRect(r,o,1,2+t()*2)}return Xl(n,s,s,10,t),e}function pT(s=512){let t=ji(17),e=ro(s),n=e.getContext("2d");n.fillStyle="rgb(112,118,70)",n.fillRect(0,0,s,s),Mi(n,s,s,5,.2,t),Mi(n,s,s,14,.16,t,!1);for(let i=0;i<16e3;i++){let r=t()*s,o=t()*s,a=t();n.fillStyle=a<.15?"rgba(150,80,60,0.55)":a<.3?"rgba(190,175,90,0.5)":a<.65?"rgba(70,86,44,0.5)":"rgba(140,150,90,0.4)",n.beginPath(),n.arc(r,o,.8+t()*1.8,0,Math.PI*2),n.fill()}return Xl(n,s,s,10,t),e}function mT(s=512){let t=ji(5),e=ro(s),n=e.getContext("2d");n.fillStyle="rgb(164,157,146)",n.fillRect(0,0,s,s);for(let i=0;i<26e3;i++){let r=t()*s,o=t()*s,a=125+t()*70;n.fillStyle=`rgba(${a},${a-3},${a-8},0.75)`,n.beginPath(),n.arc(r,o,.5+t()*1.1,0,Math.PI*2),n.fill()}return Mi(n,s,s,6,.1,t),e}function gT(s=512){let t=ji(9),e=ro(s),n=e.getContext("2d");return n.fillStyle="rgb(58,58,60)",n.fillRect(0,0,s,s),Mi(n,s,s,8,.15,t),Xl(n,s,s,26,t),e}var bi={concrete:s=>Sr(oo(1024,s)),wood:s=>Sr(Fu(1024,s)),lawn:()=>Sr(fT()),gravel:()=>Sr(mT()),sedum:()=>Sr(pT()),asphalt:()=>Sr(gT()),bumpFrom:s=>Sr(s,{srgb:!1}),toTexture:Sr};var ao=s=>new Xt(s),_T=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
  gl_Position.z = gl_Position.w * 0.99999; // immer ganz hinten
}`,xT=`
uniform vec3 top; uniform vec3 horizon; uniform vec3 ground; uniform vec3 glow;
uniform vec3 sunDir; uniform float sunAmt;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float h = d.y;
  vec3 col = mix(horizon, top, pow(clamp(h, 0.0, 1.0), 0.55));
  col = mix(col, ground, smoothstep(0.0, -0.06, h));
  float s = max(dot(d, normalize(sunDir)), 0.0);
  col += glow * pow(s, 6.0) * 0.55 * (1.0 - smoothstep(0.0, 0.5, abs(h)));
  col += glow * pow(s, 900.0) * 6.0 * sunAmt;
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;function Y_(){let s={top:{value:ao("#6f9fcf")},horizon:{value:ao("#dfe8ee")},ground:{value:ao("#4a4c42")},glow:{value:ao("#fff1d6")},sunDir:{value:new W(0,1,0)},sunAmt:{value:1}},t=new Li({uniforms:s,vertexShader:_T,fragmentShader:xT,side:Mn,depthWrite:!1,fog:!1}),e=new Ie(new Dr(900,48,24),t);return e.frustumCulled=!1,e.renderOrder=-1,{mesh:e,u:s}}var Bu=[{t:0,elev:36,az:210,sun:"#fff1dc",sunI:3.2,top:"#4f8bcf",hor:"#d6e3ec",gnd:"#8f8b7e",glow:"#fff3dc",hemiS:"#c6d8ea",hemiG:"#9a8f7c",hemiI:.85,exp:1,lights:0,env:1},{t:.45,elev:28,az:232,sun:"#ffe6c2",sunI:3,top:"#5c8bc4",hor:"#ecdcc6",gnd:"#8a8274",glow:"#ffe4bd",hemiS:"#cbd5df",hemiG:"#968a76",hemiI:.75,exp:1,lights:.15,env:.95},{t:.72,elev:9,az:262,sun:"#ffb070",sunI:2.4,top:"#4c6390",hor:"#f2b07a",gnd:"#6a5a4c",glow:"#ffb27a",hemiS:"#9aa6c0",hemiG:"#7a6650",hemiI:.55,exp:1.05,lights:.55,env:.8},{t:.86,elev:2.5,az:272,sun:"#ff8448",sunI:1.7,top:"#33446e",hor:"#ec9260",gnd:"#4a3c38",glow:"#ff8a55",hemiS:"#8a92b2",hemiG:"#5a4840",hemiI:.55,exp:1.12,lights:.85,env:.6},{t:1,elev:-5,az:282,sun:"#ff6a3a",sunI:0,top:"#0f1a36",hor:"#4a4562",gnd:"#15161c",glow:"#b8664e",hemiS:"#3b4a74",hemiG:"#1c1a1e",hemiI:.42,exp:1.25,lights:1,env:.45}];function vT(s){s=os.clamp(s,0,1);let t=0;for(;t<Bu.length-2&&s>Bu[t+1].t;)t++;let e=Bu[t],n=Bu[t+1],i=os.smoothstep(s,e.t,n.t),r=(a,l)=>a+(l-a)*i,o=(a,l)=>ao(a).lerp(ao(l),i);return{elev:r(e.elev,n.elev),az:r(e.az,n.az),sun:o(e.sun,n.sun),sunI:r(e.sunI,n.sunI),top:o(e.top,n.top),hor:o(e.hor,n.hor),gnd:o(e.gnd,n.gnd),glow:o(e.glow,n.glow),hemiS:o(e.hemiS,n.hemiS),hemiG:o(e.hemiG,n.hemiG),hemiI:r(e.hemiI,n.hemiI),exp:r(e.exp,n.exp),lights:r(e.lights,n.lights),env:r(e.env,n.env)}}var ql=class{constructor(){this.parts=new Map}add(t,e){this.parts.has(e)||this.parts.set(e,[]),this.parts.get(e).push(t.index?t.toNonIndexed():t)}build(t,e,{cast:n=!0,receive:i=!0,noCast:r=[]}={}){for(let[o,a]of this.parts){let l=q_(a,!1),c=new Ie(l,t[o]);c.castShadow=n&&!r.includes(o),c.receiveShadow=i,c.name=o,e.add(c)}}};function ht(s,t,e,n,i,r,o=1){let a=Math.max(t-s,.001),l=Math.max(n-e,.001),c=Math.max(r-i,.001),h=new qi(a,l,c),f=h.attributes.uv,u=[[c,l,i,e],[c,l,i,e],[a,c,s,i],[a,c,s,i],[a,l,s,e],[a,l,s,e]];for(let d=0;d<6;d++){let[p,_,m,g]=u[d];for(let v=0;v<4;v++){let E=d*4+v;f.setXY(E,(f.getX(E)*p+m)/o,(f.getY(E)*_+g)/o)}}return h.translate((s+t)/2,(e+n)/2,(i+r)/2),h}function fn(s,t,e,n,i,r,o,a,l,c=[],h=2.4){let f=c.slice().sort((p,_)=>p.a-_.a),u=(p,_,m,g)=>{_-p<.001||g-m<.001||(e==="x"?s.add(ht(p,_,m,g,r,o,h),t):s.add(ht(r,o,m,g,p,_,h),t))},d=n;for(let p of f)u(d,p.a,a,l),u(p.a,p.b,a,p.y0??a),u(p.a,p.b,p.y1??l,l),d=p.b;u(d,i,a,l)}function gs(s,t,e,n,i,r,o,a="glass"){t==="x"?s.add(ht(e,n,r,o,i-.012,i+.012),a):s.add(ht(i-.012,i+.012,r,o,e,n),a)}function Mr(s,t,e,n,i,r,o,a){gs(s,t,e,n,i,r+.04,o-.04);let l=(c,h,f,u)=>{t==="x"?s.add(ht(c,h,f,u,i-.05,i+.05),"frame"):s.add(ht(i-.05,i+.05,f,u,c,h),"frame")};l(e,n,r,r+.05),l(e,n,o-.05,o);for(let c=0;c<=a;c++){let h=e+(n-e)*c/a;l(h-.025,h+.025,r,o)}}function yT(s){let t=s.aniso,e=oo(1024,{seed:7}),n=bi.toTexture(e,{aniso:t}),i=bi.toTexture(e,{srgb:!1,aniso:t}),r=oo(1024,{seed:21,light:8}),o=bi.toTexture(r,{aniso:t}),a=bi.toTexture(oo(1024,{seed:33,ties:!1,joints:!1,light:4,base:[184,181,175]}),{aniso:t}),l=bi.wood({base:[190,150,108],boards:3,seed:15,contrast:.7});l.anisotropy=t;let c=bi.wood({base:[182,140,98],boards:8,seed:4}),h=bi.wood({base:[140,124,106],boards:14,seed:8,contrast:.8}),f=bi.wood({base:[184,136,92],boards:4,seed:12,joints:!1,contrast:1.2});[c,h,f].forEach(m=>m.anisotropy=t);let u=bi.lawn(),d=bi.gravel(),p=bi.asphalt(),_={concrete:new jt({map:n,bumpMap:i,bumpScale:1.2,roughness:.88}),concreteIn:new jt({map:o,bumpMap:i,bumpScale:.8,roughness:.85}),floorEG:new jt({map:a,roughness:.32,metalness:0}),plaster:new jt({color:"#e7e4de",roughness:.95}),ceilingWhite:new jt({color:"#efede8",roughness:.95}),oak:new jt({map:c,roughness:.55}),oakPanel:new jt({map:l,roughness:.6}),deck:new jt({map:h,roughness:.85}),larch:new jt({map:f,roughness:.75}),slat:new jt({map:f,roughness:.78}),backing:new jt({color:"#3a2f26",roughness:.9}),frame:new jt({color:"#2a2826",roughness:.45,metalness:.6}),steel:new jt({color:"#1e1e1e",roughness:.4,metalness:.7}),fabric:new jt({color:"#cbc4b8",roughness:1}),fabricDark:new jt({color:"#57534c",roughness:1}),rug:new jt({color:"#9a948a",roughness:1}),linen:new jt({color:"#f1efea",roughness:.95}),stoneDark:new jt({color:"#3a3936",roughness:.5}),black:new jt({color:"#121212",roughness:.8}),lawn:new jt({map:u,roughness:1}),gravel:new jt({map:d,roughness:1}),sedum:new jt({map:bi.sedum(),roughness:1}),asphalt:new jt({map:p,roughness:.95}),paving:new jt({map:n,roughness:.9,color:"#d8d4cc"}),leaf:new jt({color:"#7d8a5a",roughness:.95}),leafDark:new jt({color:"#5f6b4c",roughness:1}),grass:new jt({color:"#a6a06a",roughness:1}),bark:new jt({color:"#4d4036",roughness:1}),hedge:new jt({color:"#3d4b2f",roughness:1}),hills:new jt({color:"#5b6650",roughness:1}),water:new Bo({color:"#0f2a30",roughness:.03,metalness:0,ior:1.33,envMapIntensity:1.4}),glass:new jt({color:"#a8bcc0",transparent:!0,opacity:.1,roughness:.1,depthWrite:!1,side:pi}),glassRefl:new Bo({color:"#000000",roughness:.04,metalness:0,ior:1.5,specularIntensity:1,transparent:!0,blending:Ka,depthWrite:!1,side:pi,envMapIntensity:1.2}),frosted:new jt({color:"#d9dedd",transparent:!0,opacity:.55,roughness:.6,depthWrite:!1}),lightStrip:new jt({color:"#111",emissive:"#ffd8a6",emissiveIntensity:0}),ember:new jt({color:"#111",emissive:"#ff7a2e",emissiveIntensity:.4})};return _.oak.userData.tile=2,_}function ST(s,t){let e=new ql,n=2.4,{eg:i,og:r}=H,o=H.wall;e.add(ht(i.x0-.05,i.x1+.05,-.45,-.02,i.z0-.05,i.z1+.05,n),"concrete"),e.add(ht(i.x0+.02,i.x1-.02,-.02,0,i.z0+.02,i.z1-.12,3.2),"floorEG"),fn(e,"concrete","x",i.x0,i.x1,0,o,0,H.egCeil,[{a:1.2,b:5.2,y0:1,y1:2.2},{a:10.4,b:12.6,y0:2.1,y1:2.6},{a:H.door.x0,b:H.door.x1,y0:0,y1:H.door.h}],n),fn(e,"concrete","z",0,H.spineZ1,i.x0,i.x0+o,0,H.egCeil,[],n),fn(e,"concrete","z",0,i.z1,i.x1-o,i.x1,0,H.egCeil,[{a:7.6,b:9.8,y0:.9,y1:2.4}],n),Mr(e,"x",i.x0+.02,i.x1-o,i.z1-.08,0,H.egCeil,6),Mr(e,"z",H.spineZ1,i.z1-.08,i.x0+.08,0,H.egCeil,2),gs(e,"x",1.2,5.2,.15,1,2.2),gs(e,"x",10.4,12.6,.15,2.1,2.6),gs(e,"z",7.6,9.8,i.x1-.15,.9,2.4),fn(e,"concreteIn","x",o,H.spineX1,H.spineZ0,H.spineZ1,0,H.egCeil,[{a:4.6,b:5.5,y0:0,y1:2.2},{a:6.15,b:6.95,y0:0,y1:2.2}],n),e.add(ht(H.void.x0,H.void.x1,H.egCeil,H.ogCeil,H.spineZ0,H.spineZ1,n),"concreteIn"),fn(e,"plaster","z",o,H.spineZ0,5.9,6.05,0,H.egCeil),fn(e,"plaster","z",o,H.spineZ0,9.6,9.75,0,H.egCeil),fn(e,"plaster","z",o,H.spineZ0,13.25,13.4,0,H.egCeil,[{a:1.6,b:2.5,y0:0,y1:2.2}]);let a=H.egCeil,l=H.ogFloor;e.add(ht(i.x0,r.x0,a,l,i.z0,i.z1,n),"concrete"),e.add(ht(r.x0,r.x1,a,l,r.z0,H.void.z0,n),"concrete"),e.add(ht(r.x0,r.x1,a,l,H.void.z1,r.z1,n),"concrete"),e.add(ht(r.x0,H.void.x0,a,l,H.void.z0,H.void.z1,n),"concrete"),e.add(ht(H.void.x1,r.x1,a,l,H.void.z0,H.void.z1,n),"concrete");let c=H.stair,h=H.ogFloor/c.risers,f=(c.x1-c.x0)/(c.risers-1);for(let j=0;j<c.risers-1;j++){let z=c.x0+j*f,it=(j+1)*h;e.add(ht(z,z+f+.01,it-.065,it,c.z0,c.z1,2),"oak")}{let j=Math.hypot(c.x1-c.x0,H.ogFloor),z=new qi(j+.6,.035,.035);z.rotateZ(Math.atan2(H.ogFloor-h,c.x1-c.x0)),z.translate((c.x0+c.x1)/2,H.ogFloor/2+.92,c.z0+.07),e.add(z,"steel")}let u=H.ogFloor,d=H.ogCeil;e.add(ht(r.x0+o,r.x1-o,u,u+.012,r.z0+o,H.void.z0,2),"oak"),e.add(ht(r.x0+o,r.x1-o,u,u+.012,H.void.z1,r.z1-o,2),"oak"),e.add(ht(H.void.x1,r.x1-o,u,u+.012,H.void.z0,H.void.z1,2),"oak");let p=H.skylight,_=(j,z,it,ut,bt,lt,Ct,re)=>{e.add(ht(z,it,lt,Ct,ut,p.z0,re),j),e.add(ht(z,it,lt,Ct,p.z1,bt,re),j),e.add(ht(z,p.x0,lt,Ct,p.z0,p.z1,re),j),e.add(ht(p.x1,it,lt,Ct,p.z0,p.z1,re),j)};_("ceilingWhite",r.x0+o,r.x1-o,r.z0+o,r.z1-o,d-.01,d,1),_("concrete",r.x0,r.x1,r.z0,r.z1,d,H.roofTop,n),e.add(ht(p.x0-.12,p.x1+.12,H.roofTop,H.roofTop+.18,p.z0-.12,p.z0,n),"concrete"),e.add(ht(p.x0-.12,p.x1+.12,H.roofTop,H.roofTop+.18,p.z1,p.z1+.12,n),"concrete"),e.add(ht(p.x0-.12,p.x0,H.roofTop,H.roofTop+.18,p.z0,p.z1,n),"concrete"),e.add(ht(p.x1,p.x1+.12,H.roofTop,H.roofTop+.18,p.z0,p.z1,n),"concrete"),e.add(ht(p.x0,p.x1,H.roofTop+.18,H.roofTop+.2,p.z0,p.z1),"glass"),e.add(ht(p.x0,p.x1,d,H.roofTop,p.z0-.01,p.z0),"ceilingWhite"),e.add(ht(p.x0,p.x1,d,H.roofTop,p.z1,p.z1+.01),"ceilingWhite"),e.add(ht(p.x0-.01,p.x0,d,H.roofTop,p.z0,p.z1),"ceilingWhite"),e.add(ht(p.x1,p.x1+.01,d,H.roofTop,p.z0,p.z1),"ceilingWhite"),e.add(ht(r.x0,r.x1,H.roofTop,H.attika,r.z0,r.z0+.25,n),"concrete"),e.add(ht(r.x0,r.x1,H.roofTop,H.attika,r.z1-.25,r.z1,n),"concrete"),e.add(ht(r.x0,r.x0+.25,H.roofTop,H.attika,r.z0,r.z1,n),"concrete"),e.add(ht(r.x1-.25,r.x1,H.roofTop,H.attika,r.z0,r.z1,n),"concrete"),_("sedum",r.x0+.25,r.x1-.25,r.z0+.25,r.z1-.25,H.roofTop,H.roofTop+.08,4);let m=[{a:7.4,b:10.2,y0:u+.5,y1:d-.2},{a:14,b:15.2,y0:u+1.6,y1:d-.2},{a:17,b:19,y0:u+.5,y1:d-.2}];fn(e,"backing","x",r.x0,r.x1,r.z0,r.z0+o,u,d,m),m.forEach(j=>gs(e,"x",j.a,j.b,r.z0+.15,j.y0,j.y1)),e.add(ht(r.x0,r.x0+o,u,d,r.z1-o,r.z1),"backing"),e.add(ht(13.6,13.75,u,d,r.z1-o,r.z1),"backing"),e.add(ht(16.4,16.55,u,d,r.z1-o,r.z1),"backing"),e.add(ht(r.x1-o,r.x1,u,d,r.z1-o,r.z1),"backing"),Mr(e,"x",r.x0+o,13.6,r.z1-.15,u,d,3),gs(e,"x",13.75,16.4,r.z1-.15,u,d,"frosted"),Mr(e,"x",16.55,r.x1-o,r.z1-.15,u,d,1),fn(e,"backing","z",r.z0,4.9,r.x0,r.x0+o,u,d),fn(e,"backing","z",11.2,r.z1,r.x0,r.x0+o,u,d),Mr(e,"z",4.9,H.slider.z0,r.x0+.15,u,d,1),Mr(e,"z",H.slider.z1,11.2,r.x0+.15,u,d,1),e.add(ht(r.x0+.1,r.x0+.2,d-.06,d,H.slider.z0,H.slider.z1),"frame");let g=[{a:1,b:2.8,y0:u+.5,y1:d-.2},{a:6,b:10.6,y0:u,y1:d}];fn(e,"backing","z",r.z0,r.z1,r.x1-o,r.x1,u,d,g),gs(e,"z",1,2.8,r.x1-.15,u+.5,d-.2),Mr(e,"z",6,10.6,r.x1-.15,u,d,2),fn(e,"concreteIn","x",r.x0+o,H.void.x1,H.spineZ0,H.spineZ1,u,d),fn(e,"plaster","x",H.void.x1,r.x1-o,H.spineZ0,H.spineZ1,u,d,[{a:12.2,b:12.85,y0:u,y1:u+2.2},{a:14,b:14.8,y0:u,y1:u+2.2},{a:17,b:17.8,y0:u,y1:u+2.2}]),fn(e,"plaster","x",r.x0+o,r.x1-o,4.8,4.9,u,d,[{a:H.bedDoor.x0,b:H.bedDoor.x1,y0:u,y1:u+2.25},{a:17.5,b:18.3,y0:u,y1:u+2.2}]),fn(e,"plaster","z",r.z0+o,H.spineZ0,12.9,13.05,u,d),fn(e,"plaster","z",r.z0+o,H.spineZ0,16,16.15,u,d),fn(e,"plaster","z",4.9,r.z1-o,13.6,13.75,u,d,[{a:9.6,b:10.4,y0:u,y1:u+2.2}]),fn(e,"plaster","z",4.9,r.z1-o,16.4,16.55,u,d);let v=[],E=.11,y=(j,z,it,ut,bt=[])=>{for(let lt=z+E/2;lt<it;lt+=E)bt.some(Ct=>lt>Ct.a-.03&&lt<Ct.b+.03)||v.push({axis:j,u:lt,t:ut})};y("x",r.x0,r.x1,r.z0-.05),y("x",13.75,16.4,r.z1+.05),y("z",r.z0,4.9,r.x0-.05),y("z",11.2,r.z1,r.x0-.05),y("z",r.z0,r.z1,r.x1+.05,[g[1]]);let M=new qi(.045,d-u+.32,.05),b=M.attributes.uv;for(let j=0;j<b.count;j++)b.setXY(j,b.getX(j)*.12,b.getY(j)*1.6);let x=new Ks(M,t.slat,v.length),S=ji(77),R=new ge,A=new Xt;v.forEach((j,z)=>{let it=(u+d)/2+0;j.axis==="x"?R.makeTranslation(j.u,it,j.t):R.makeRotationY(Math.PI/2).setPosition(j.t,it,j.u),x.setMatrixAt(z,R);let ut=.86+S()*.24;x.setColorAt(z,A.setRGB(ut,ut*(.97+S()*.04),ut*(.94+S()*.06)))}),x.castShadow=!0,x.receiveShadow=!0,s.add(x),e.add(ht(i.x0+.15,r.x0,l,l+.05,i.z0+.15,i.z1-.15,3),"deck"),e.add(ht(i.x0,i.x0+.15,l,l+.12,i.z0,i.z1,n),"concrete"),e.add(ht(i.x0,r.x0,l,l+.12,i.z0,i.z0+.15,n),"concrete"),e.add(ht(i.x0,r.x0,l,l+.12,i.z1-.15,i.z1,n),"concrete"),gs(e,"z",i.z0+.1,i.z1-.1,i.x0+.08,l+.1,l+1.1),gs(e,"x",i.x0+.1,r.x0,i.z0+.08,l+.1,l+1.1),gs(e,"x",i.x0+.1,r.x0,i.z1-.08,l+.1,l+1.1),e.add(ht(.4,5.6,l,l+.6,.35,1.15,n),"concrete"),e.add(ht(.35,1.25,l,l+.6,8.6,10.1,n),"concrete");for(let j of[2,3.2]){e.add(ht(1,2.9,l+.05,l+.32,j,j+.75,2),"oak");let z=new qi(.75,.08,.72);z.rotateZ(-.7),z.translate(1.2,l+.55,j+.375),e.add(z,"fabric"),e.add(ht(1.45,2.9,l+.32,l+.4,j+.03,j+.72,1),"fabric")}e.add(ht(i.x0,i.x1,-.08,0,i.z1,i.z1+2.1,3),"deck");let D=H.pool;e.add(ht(D.x0-.4,D.x1+.4,-.06,.02,D.z0-.4,D.z0,n),"paving"),e.add(ht(D.x0-.4,D.x1+.4,-.06,.02,D.z1,D.z1+.4,n),"paving"),e.add(ht(D.x0-.4,D.x0,-.06,.02,D.z0,D.z1,n),"paving"),e.add(ht(D.x1,D.x1+.4,-.06,.02,D.z0,D.z1,n),"paving"),e.add(ht(10.5,22.5,-.05,.005,-15,0,3),"gravel");for(let j=-14.6;j<-.4;j+=.9)e.add(ht(14.25,15.65,-.04,.02,j,j+.62,2.4),"paving");fn(e,"concrete","x",-12,32,-15.3,-15,-.05,1,[{a:13.7,b:16.2,y0:-.05,y1:1}],n),e.add(ht(-200,200,-.06,-.01,-24,-17.5,6),"asphalt"),e.add(ht(-200,200,-.05,.03,-17.5,-15.3,2.4),"paving");for(let j of[15,16.2])e.add(ht(j,j+.75,0,.3,13.6,15.6,1),"oak"),e.add(ht(j+.03,j+.72,.3,.38,14.1,15.6,1),"fabric");e.add(ht(1.6,3.8,0,H.egCeil,H.spineZ1,4.25,n),"concreteIn"),e.add(ht(2,3.4,.45,.95,4.2,4.27,1),"black"),e.add(ht(2.15,3.25,.47,.58,4.22,4.272,1),"ember"),e.add(ht(1.6,4.4,0,.42,H.spineZ1,4.25,n),"concreteIn"),e.add(ht(1.4,5.8,0,.012,4.7,7.6,1),"rug"),e.add(ht(1.7,5.5,0,.42,6.1,7.05,1),"fabric"),e.add(ht(1.7,5.5,.42,.78,6.8,7.05,1),"fabric"),e.add(ht(4.55,5.5,0,.42,4.9,6.1,1),"fabric"),e.add(ht(5.25,5.5,.42,.78,4.9,6.8,1),"fabric"),e.add(ht(2.6,4.1,0,.34,5,5.7,2),"oak"),e.add(ht(7.3,10.3,.7,.75,6.6,7.6,2),"oak"),e.add(ht(7.7,7.78,0,.7,6.75,7.45,2),"oak"),e.add(ht(9.82,9.9,0,.7,6.75,7.45,2),"oak");for(let j=0;j<4;j++){let z=7.55+j*.7;for(let it of[-1,1]){let ut=it<0?6.1:7.65;e.add(ht(z,z+.46,.44,.48,ut,ut+.45,1),"fabricDark");let bt=it<0?ut:ut+.41;e.add(ht(z,z+.46,.48,.86,bt,bt+.04,1),"fabricDark"),e.add(ht(z+.2,z+.26,0,.44,ut+.2,ut+.26,1),"steel")}}for(let j of[8.1,8.8,9.5]){e.add(ht(j-.005,j+.005,1.9,H.egCeil,7.095,7.105,1),"steel");let z=new Ii(.14,.18,.22,24,1,!0);z.translate(j,1.8,7.1),e.add(z,"steel");let it=new Ii(.15,.15,.01,24);it.translate(j,1.7,7.1),e.add(it,"lightStrip")}e.add(ht(12.4,14.8,0,.88,6.6,7.6,1.8),"oakPanel"),e.add(ht(12.35,14.85,.88,.92,6.55,7.65,n),"stoneDark"),e.add(ht(16.05,16.7,0,2.5,3.9,7.4,1.8),"oakPanel"),e.add(ht(16.05,16.7,2.5,H.egCeil,3.9,7.4,1),"plaster");for(let j of[12.9,13.6,14.3]){let z=new Ii(.18,.18,.05,20);z.translate(j,.72,6.2),e.add(z,"fabricDark");let it=new Ii(.02,.02,.7,8);it.translate(j,.35,6.2),e.add(it,"steel")}e.add(ht(1.5,15.5,H.egCeil-.012,H.egCeil-.002,9.6,9.66,1),"lightStrip"),e.add(ht(13.8,16.4,H.egCeil-.012,H.egCeil-.002,1.9,1.96,1),"lightStrip");{let j=new Ii(.32,.26,.6,24);j.translate(.9,.3,9.7),e.add(j,"concreteIn")}let I=u+.012;e.add(ht(7.3,12,I,I+.01,6,9.2,1),"rug"),e.add(ht(8.7,11,I,I+.3,6.55,8.65,2),"oak"),e.add(ht(8.8,10.95,I+.3,I+.55,6.6,8.6,1),"linen"),e.add(ht(8.75,9.7,I+.55,I+.6,6.58,8.62,1),"fabric"),e.add(ht(10.45,10.85,I+.55,I+.7,6.8,7.5,1),"linen"),e.add(ht(10.45,10.85,I+.55,I+.7,7.7,8.4,1),"linen"),e.add(ht(11,11.2,I,I+1.1,6.1,9.1,1.8),"oakPanel"),e.add(ht(10.65,10.98,I,I+.45,6.05,6.45,2),"oak"),e.add(ht(10.65,10.98,I,I+.45,8.75,9.15,2),"oak"),e.add(ht(7.9,8.35,I,I+.42,6.8,8.4,1),"fabricDark"),e.add(ht(6.6,11.8,I,d,4.9,5.5,1.8),"oakPanel"),e.add(ht(7.5,12.4,d-.012,d-.002,10.6,10.66,1),"lightStrip");for(let j of[6.25,8.95]){let z=new Ii(.09,.09,.2,20);z.translate(10.82,I+.55,j),e.add(z,"lightStrip")}e.add(ht(12.4,19.4,d-.012,d-.002,4.17,4.23,1),"lightStrip"),e.add(ht(17,19.4,d-.012,d-.002,8,8.06,1),"lightStrip"),e.build(t,s,{noCast:["glass","glassRefl","frosted","lightStrip","rug","floorEG","gravel","asphalt"]});let F=s.getObjectByName("glass");if(F){let j=new Ie(F.geometry,t.glassRefl);j.renderOrder=2,F.renderOrder=1,F.castShadow=!1,s.add(j)}let L=new Ri;L.position.set(H.door.x0+.3,0,.15);let B=H.door.x1-H.door.x0-.02,G=new Ie(ht(-.29,B-.29,.005,H.door.h-.01,-.035,.035,.6),t.larch);G.castShadow=G.receiveShadow=!0;let O=new Ie(ht(B-.5,B-.46,.4,2.2,-.09,-.04,1),t.steel);L.add(G,O),s.add(L);let $=new Ri,V=H.slider,C=new ql;Mr(C,"z",V.z0,V.z1,0,u,d-.06,1);let K=new Ri;C.build(t,K,{cast:!1}),K.children.forEach(j=>$.add(j));let gt=new Ie($.getObjectByName("glass").geometry,t.glassRefl);return gt.renderOrder=2,$.add(gt),$.position.x=r.x0+.06,s.add($),{door:L,slider:$}}function MT(s){let t=new Dr(1,22,16),e=t.attributes.position,n=new W,i=s*1.7;for(let r=0;r<e.count;r++){n.fromBufferAttribute(e,r);let o=Math.sin(n.x*3.1+i)*Math.sin(n.y*2.7+i*.5)*Math.sin(n.z*3.3-i)*.09+Math.sin(n.x*7+n.z*5+i)*.025;n.multiplyScalar(1+o),e.setXYZ(r,n.x,n.y,n.z)}return t.computeVertexNormals(),t}function bT(s,t,e){t.lawn.map.repeat.set(160,160);let i=new Ie(new js(1600,1600),t.lawn);i.rotation.x=-Math.PI/2,i.position.y=-.03,i.receiveShadow=!0,s.add(i);let r=H.pool,o=new Ie(new js(r.x1-r.x0,r.z1-r.z0),t.water);o.rotation.x=-Math.PI/2,o.position.set((r.x0+r.x1)/2,-.012,(r.z0+r.z1)/2),o.receiveShadow=!0,s.add(o);let a=MT(3),l=new Ii(.12,.2,1,8);l.translate(0,.5,0);let c=[[-7,-5,1],[-16,1,1.15],[-13,18,.9],[36,4,1.1],[35,-7,1],[-2,27,1.1],[22,31,1],[-17,21,1.25],[2,-21,.9],[26,-21,1],[-14,-12,1.1],[41,-12,1],[12,35,1.2],[-6,33,1],[30,24,.9]],h=ji(99),f=[],u=e.farTrees;for(let I=0;I<u;I++){let F=h()*Math.PI*2,L=60+h()*110,B=9+Math.cos(F)*L,G=5+Math.sin(F)*L;G<-12&&G>-30||f.push([B,G,.9+h()*1.1])}let d=(I,F,L)=>{let G=new Ks(a,L,I.length*4),O=new Ks(l,t.bark,I.length),$=new ge,V=new ui,C=new Ci,K=new Xt,gt=0;I.forEach(([j,z,it],ut)=>{let bt=3.6*it;$.compose(new W(j,0,z),V.identity(),new W(it,bt+1.5*it,it)),O.setMatrixAt(ut,$);let lt=.82+h()*.3;for(let Ct=0;Ct<4;Ct++){let re=(h()-.5)*1.5*it,Pt=(h()-.5)*1.5*it,Ht=bt+(.4+h()*1.8)*it,It=(1+h()*.7)*it;C.set(h()*3,h()*3,h()*3),V.setFromEuler(C),$.compose(new W(j+re,Ht,z+Pt),V,new W(It,It*.9,It)),G.setMatrixAt(gt,$);let Ot=lt*(.94+h()*.1);G.setColorAt(gt++,K.setRGB(Ot,Ot*(.98+h()*.05),Ot*.92))}}),G.castShadow=O.castShadow=F,G.receiveShadow=O.receiveShadow=!0,s.add(G,O)};d(c,!0,t.leaf),d(f,!1,t.leafDark);let p=new Va(.014,1,3);p.translate(0,.5,0);let _=[],m=ji(5),g=(I,F,L,B,G,O,$,V)=>{for(let C=0;C<O;C++)_.push([I+m()*(F-I),G,L+m()*(B-L),$+m()*(V-$)])};g(.5,4.4,.45,1.05,H.ogFloor+.55,520,.3,.75),g(.45,1.15,8.7,10,H.ogFloor+.55,160,.35,.85),g(13.9,17.2,16.8,18,0,420,.3,.75),g(-1.5,.8,11,15.5,0,360,.3,.7);let v=new Ks(p,t.grass,_.length),E=new ge,y=new ui,M=new Ci;_.forEach(([I,F,L,B],G)=>{M.set((m()-.5)*.5,m()*6,(m()-.5)*.5),y.setFromEuler(M),E.compose(new W(I,F,L),y,new W(1,B,1)),v.setMatrixAt(G,E)}),v.receiveShadow=!0,s.add(v);let b=new Ie(a,t.leaf);b.scale.set(.65,.75,.65),b.position.set(4.9,H.ogFloor+2,.75),b.castShadow=!0;let x=new Ie(l,t.bark);x.scale.set(.5,1.5,.5),x.position.set(4.9,H.ogFloor+.55,.75);let S=new Ie(a,t.leaf);S.scale.set(.45,.6,.45),S.position.set(.9,1.05,9.7),s.add(b,x,S);let R=new ql;R.add(ht(-14,-12.8,0,1.6,-14.5,32,1),"hedge"),R.add(ht(36,37.2,0,1.6,-14.5,32,1),"hedge"),R.add(ht(-14,37.2,0,1.6,32,33.2,1),"hedge"),R.build(t,s);let A=new Dr(1,24,12),D=ji(4);for(let I=0;I<9;I++){let F=I/9*Math.PI*2+D(),L=280+D()*160,B=new Ie(A,t.hills);B.scale.set(120+D()*120,18+D()*30,120+D()*100),B.position.set(Math.cos(F)*L,-6,Math.sin(F)*L),s.add(B)}}function Z_(s,t){let e=new Uo,n=yT(t),i=Y_();e.add(i.mesh),e.fog=new Ua(ao("#dfe8ee"),.0042);let r=new Ri;e.add(r);let o=ST(r,n);bT(e,n,t);let a=new Ja("#fff",3);a.castShadow=!0,a.shadow.mapSize.set(t.shadow,t.shadow);let l=a.shadow.camera;l.left=-30,l.right=30,l.top=30,l.bottom=-30,l.near=1,l.far=160,a.shadow.bias=-4e-4,a.shadow.normalBias=.035,a.shadow.radius=3,a.target.position.set(9,2,6),e.add(a,a.target);let c=new Xa("#c6d8ea","#6d6450",.8);e.add(c);let f=[[3.5,2.2,7.4,1],[8.8,1.6,7.1,1.1],[13.4,2.2,6,.9],[15,2.3,1.9,.6],[9.6,5.2,8.6,1],[17.6,5.3,8,.7],[15.5,5.4,4.2,.5]].slice(0,t.lamps).map(([b,x,S,R])=>{let A=new Za("#ffc98f",0,11,1.6);return A.position.set(b,x,S),A.userData.k=R,e.add(A),A}),u=new Yo(s),d=new Uo,p=Y_();d.add(p.mesh);let _=null,m=-1,g=new W,v=-1;function E(b,x=!1){if(!x&&Math.abs(b-v)<.0015)return!1;v=b;let S=vT(b),R=os.degToRad(S.elev),A=os.degToRad(S.az);g.set(Math.sin(A)*Math.cos(R),Math.sin(R),-Math.cos(A)*Math.cos(R)),a.position.copy(a.target.position).addScaledVector(g,80),a.color.copy(S.sun),a.intensity=S.sunI,a.castShadow=S.sunI>.05;for(let D of[i.u,p.u])D.top.value.copy(S.top),D.horizon.value.copy(S.hor),D.ground.value.copy(S.gnd),D.glow.value.copy(S.glow),D.sunDir.value.copy(g),D.sunAmt.value=S.elev>-1?1:0;if(e.fog.color.copy(S.hor).lerp(S.top,.15),c.color.copy(S.hemiS),c.groundColor.copy(S.hemiG),c.intensity=S.hemiI,s.toneMappingExposure=S.exp,f.forEach(D=>D.intensity=S.lights*9*D.userData.k),n.lightStrip.emissiveIntensity=.3+S.lights*2.6,n.ember.emissiveIntensity=.6+S.lights*2.2,n.glass.emissive=n.glass.emissive||new Xt,n.glass.emissive.set("#ffb36b").multiplyScalar(S.lights*.12),e.environmentIntensity=S.env,s.shadowMap.needsUpdate=!0,Math.abs(b-m)>.04||x){m=b;let D=u.fromScene(d,0,.1,1e3);_&&_.dispose(),_=D,e.environment=D.texture}return!0}function y(b){o.door.rotation.y=-b*Math.PI*.5}function M(b){o.slider.position.z=-b*(H.slider.z1-H.slider.z0-.15),o.slider.position.x=H.og.x0+.06-(b>.02?.07:0)}return{scene:e,setTimeOfDay:E,setDoor:y,setSlider:M,materials:n}}var br=[{s:0,p:[30,10.5,27],t:[9.5,2.6,5],tod:.05,fov:40},{s:.07,p:[30,6.5,19],t:[10,3,4],tod:.1,fov:44},{s:.12,p:[31,3.2,3],t:[14,2.6,1],tod:.15,fov:48},{s:.17,p:[25,1.8,-13],t:[15,2.6,0],tod:.2,fov:50},{s:.225,p:[19.2,1.65,-10.8],t:[15,2.4,0],tod:.22,fov:52},{s:.265,p:[15.3,1.65,-3.2],t:[15,1.7,.5],tod:.24,fov:56},{s:.295,p:[15.1,1.65,.2],t:[14.9,1.6,4],tod:.26,fov:62},{s:.325,p:[14.9,1.65,2.6],t:[10,1.4,8.5],tod:.28,fov:64},{s:.36,p:[15.4,1.65,5.6],t:[4,1.3,9.6],tod:.3,fov:64},{s:.4,p:[15.55,1.65,8.5],t:[4,1.3,9],tod:.32,fov:64},{s:.44,p:[11.2,1.6,9],t:[3,1.3,7],tod:.34,fov:64},{s:.475,p:[6.8,1.55,9.4],t:[1.8,1.1,5],tod:.37,fov:64},{s:.505,p:[6.2,1.6,7.6],t:[10,2.2,4.3],tod:.4,fov:64},{s:.54,p:[6.2,1.65,4.3],t:[12,3.4,4.1],tod:.43,fov:64},{s:.59,p:[9.3,3.16,4.15],t:[14,4.9,4.15],tod:.48,fov:64},{s:.63,p:[12.35,4.95,4.15],t:[16,4.85,4.25],tod:.53,fov:64},{s:.66,p:[12.8,4.95,4.35],t:[12.8,4.75,8],tod:.57,fov:64},{s:.685,p:[12.8,4.95,5.5],t:[9.5,4.5,8.2],tod:.6,fov:64},{s:.72,p:[12.95,4.95,10.4],t:[7,4.25,7],tod:.63,fov:64},{s:.755,p:[10.8,4.95,10.45],t:[5,4.5,7.6],tod:.67,fov:64},{s:.79,p:[8.4,4.95,9.6],t:[3,4.6,7.8],tod:.71,fov:64},{s:.82,p:[6.9,4.95,8.2],t:[2,4.8,8],tod:.75,fov:62},{s:.86,p:[1,5,1.55],t:[6.5,4.45,9.8],tod:.79,fov:60},{s:.905,p:[-1.8,6.6,3.5],t:[6,3.6,8.5],tod:.86,fov:56},{s:.95,p:[-7,9,19],t:[8,3.4,5],tod:.94,fov:50},{s:1,p:[-15,13,31],t:[9,3.2,5],tod:1,fov:42}],ks=[{id:"hero",from:0,to:.05,stop:0},{id:"ankommen",from:.15,to:.285,stop:.225},{id:"wohnen",from:.34,to:.49,stop:.36},{id:"treppe",from:.52,to:.645,stop:.54},{id:"schlafen",from:.7,to:.815,stop:.72},{id:"terrasse",from:.845,to:.93,stop:.86},{id:"nacht",from:.955,to:1.01,stop:1}],zu={from:.235,to:.285},ku={from:.785,to:.83};var wT="http://www.w3.org/2000/svg",wr=(s,t=1)=>s.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t});function vn(s,t={},e){let n=document.createElementNS(wT,s);for(let[i,r]of Object.entries(t))n.setAttribute(i,r);return e&&e.appendChild(n),n}function Oe(s,t,e,n,i,r){return vn("rect",{x:t,y:n,width:e-t,height:i-n,class:r},s)}function Qn(s,t,e,n,i,r){return vn("line",{x1:t,y1:e,x2:n,y2:i,class:r},s)}function ki(s,t,e,n,i){let r=vn("text",{x:t,y:e,class:i},s);return r.textContent=n,r}function $_(s,t){let e=s==="eg",n=vn("svg",{viewBox:`-1.5 -2.4 23 ${e?20.4:16.4}`,class:"plan-svg",role:"img"}),i=vn("title",{},n);i.textContent={eg:"Grundriss Erdgeschoss",og:"Grundriss Obergeschoss",dach:"Draufsicht Dach mit Dachterrasse"}[s];let r=vn("g",{},n),{eg:o,og:a}=H,l=H.wall;if(s==="eg"?Oe(r,a.x0,a.x1,a.z0,a.z1,"ghost"):Oe(r,o.x0,o.x1,o.z0,o.z1,"ghost"),vr[s].forEach(u=>{let d=Oe(r,u.x0,u.x1,u.z0,u.z1,"room");d.dataset.id=u.id,d.setAttribute("tabindex","0"),d.setAttribute("aria-label",`${u.name}, ${wr(yr(u))} Quadratmeter`);let p=()=>t&&t(u,s);d.addEventListener("mouseenter",p),d.addEventListener("focus",p);let _=(u.x0+u.x1)/2,m=(u.z0+u.z1)/2,g=u.x1-u.x0,v=u.name;v.length*.19>g-.3&&(v=u.short||v);let E=v.length*.19>g-.3||u.z1-u.z0<1.6;u.z1-u.z0>=1.1&&(ki(r,_,m-(E?.05:.15),v,E?"label small":"label"),ki(r,_,m+(E?.42:.5),`${wr(yr(u))} m\xB2`,"area"))}),s==="eg"&&([[o.x0,o.x1,o.z0,o.z0+l],[o.x0,o.x0+l,o.z0,H.spineZ1],[o.x1-l,o.x1,o.z0,o.z1],[l,H.spineX1,H.spineZ0,H.spineZ1],[5.9,6.05,l,H.spineZ0],[9.6,9.75,l,H.spineZ0],[13.25,13.4,l,H.spineZ0],[1.6,3.8,H.spineZ1,4.25]].forEach(d=>Oe(r,d[0],d[1],d[2],d[3],"wall")),Oe(r,H.door.x0,H.door.x1,-.02,l+.02,"gap"),vn("path",{d:`M${H.door.x0+.3} ${l} l0 1.0 M${H.door.x0+.3} ${l} A1 1 0 0 1 ${H.door.x0+1.3} ${l}`,class:"swing"},r),Qn(r,o.x0,o.z1-.08,o.x1-l,o.z1-.08,"glass"),Qn(r,o.x0+.08,H.spineZ1,o.x0+.08,o.z1,"glass"),TT(r),Oe(r,H.pool.x0,H.pool.x1,H.pool.z0,H.pool.z1,"pool"),ki(r,(H.pool.x0+H.pool.x1)/2,(H.pool.z0+H.pool.z1)/2+.15,"Wasserbecken","label small muted"),ki(r,H.door.x0-.35,-.9,"Eingang","label small muted end"),vn("path",{d:`M${(H.door.x0+H.door.x1)/2} -1.9 l0 1.4 m-0.25 -0.35 l0.25 0.35 l0.25 -0.35`,class:"arrow"},r)),s==="og"&&([[a.x0,a.x1,a.z0,a.z0+l],[a.x0,a.x1,a.z1-l,a.z1],[a.x0,a.x0+l,a.z0,a.z1],[a.x1-l,a.x1,a.z0,a.z1],[a.x0+l,a.x1-l,H.spineZ0,H.spineZ1],[a.x0+l,a.x1-l,4.8,4.9],[12.9,13.05,l,H.spineZ0],[16,16.15,l,H.spineZ0],[13.6,13.75,4.9,a.z1-l],[16.4,16.55,4.9,a.z1-l]].forEach(d=>Oe(r,d[0],d[1],d[2],d[3],"wall")),[[H.bedDoor.x0,H.bedDoor.x1,4.78,4.92],[12.2,12.85,3.38,3.62],[14,14.8,3.38,3.62],[17,17.8,3.38,3.62],[17.5,18.3,4.78,4.92]].forEach(d=>Oe(r,d[0],d[1],d[2],d[3],"gap")),Oe(r,13.58,13.77,9.6,10.4,"gap"),Qn(r,a.x0+l,a.z1-.15,13.6,a.z1-.15,"glass"),Qn(r,16.55,a.z1-.15,a.x1-l,a.z1-.15,"glass"),Qn(r,a.x0+.15,4.9,a.x0+.15,11.2,"glass"),Qn(r,a.x1-.15,6,a.x1-.15,10.6,"glass"),Oe(r,a.x0-.02,a.x0+l+.02,H.slider.z0,H.slider.z1,"gap"),Oe(r,H.void.x0,H.void.x1,H.void.z0,H.void.z1,"void"),Qn(r,H.void.x0,H.void.z0,H.void.x1,H.void.z1,"thin"),Qn(r,H.void.x0,H.void.z1,H.void.x1,H.void.z0,"thin"),ki(r,9.2,4.33,"Luftraum","label small muted"),Oe(r,o.x0,a.x0,o.z0,o.z1,"terrace"),ki(r,3,5.4,"Dachterrasse","label small muted"),ki(r,3,5.95,"+3,30","area muted")),s==="dach"){Oe(r,a.x0,a.x1,a.z0,a.z1,"roof"),Oe(r,a.x0+.25,a.x1-.25,a.z0+.25,a.z1-.25,"thin-rect"),ki(r,13,5.6,"Flachdach, Kies","label muted"),ki(r,13,6.2,"Attika +6,70","area muted");for(let u=.5;u<10.4;u+=.5)Qn(r,.2,u,5.8,u,"deck");Oe(r,o.x0,a.x0,o.z0,o.z1,"wall-outline")}let h=vn("g",{transform:"translate(20.4 -1.3)"},n);vn("circle",{r:.6,class:"thin-circle"},h),vn("path",{d:"M0 -0.5 L0.22 0.35 L0 0.18 L-0.22 0.35 Z",class:"north"},h),ki(h,0,-.75,"N","area");let f=vn("g",{transform:`translate(-0.6 ${e?17.4:13.4})`},n);for(let u=0;u<5;u++)Oe(f,u,u+1,0,.18,u%2?"scale-b":"scale-a");return ki(f,0,-.25,"0","area start"),ki(f,5,-.25,"5 m","area start"),n}function TT(s){let t=H.stair,e=(t.x1-t.x0)/(t.risers-1);Oe(s,t.x0,t.x1,t.z0,t.z1,"stair");for(let n=1;n<t.risers-1;n++)Qn(s,t.x0+n*e,t.z0,t.x0+n*e,t.z1,"thin");vn("path",{d:`M${t.x0+.1} ${(t.z0+t.z1)/2} L${t.x1-.25} ${(t.z0+t.z1)/2} m-0.25 -0.2 l0.25 0.2 l-0.25 0.2`,class:"arrow"},s)}function J_(){let s=vn("svg",{viewBox:"-3.5 -8.4 27 9.6",class:"elev-svg",role:"img"});vn("title",{},s).textContent="Ansicht von S\xFCden mit H\xF6hen";let t=vn("g",{transform:"scale(1 -1)"},s),{eg:e,og:n}=H;Qn(t,-3,0,23.5,0,"ground"),Oe(t,e.x0,e.x1,0,H.egCeil,"glass-face");for(let r=0;r<=6;r++){let o=e.x0+(e.x1-H.wall)*r/6;Qn(t,o,0,o,H.egCeil,"mullion")}Oe(t,e.x0,n.x1,H.egCeil,H.ogFloor,"slab"),Oe(t,n.x0,n.x1,H.ogFloor,H.ogCeil,"wood-face");for(let r=13.75;r<16.4;r+=.22)Qn(t,r,H.ogFloor,r,H.ogCeil,"slat");Oe(t,n.x0+.3,13.6,H.ogFloor,H.ogCeil,"glass-face solid"),Oe(t,16.55,n.x1-.3,H.ogFloor,H.ogCeil,"glass-face solid"),[8.73,11.16].forEach(r=>Qn(t,r,H.ogFloor,r,H.ogCeil,"mullion")),Oe(t,n.x0,n.x1,H.ogCeil,H.attika,"slab"),Oe(t,e.x0,n.x0,H.ogFloor,H.ogFloor+1.1,"rail");let i=(r,o)=>{Qn(t,-2.6,r,-.4,r,"kote-line"),vn("path",{d:`M-1.0 ${r} l-0.22 0.32 l0.44 0 Z`,class:"kote-mark"},t);let a=vn("text",{x:-2.6,y:-(r+.15),class:"kote",transform:"scale(1 -1)"},t);a.textContent=o};return i(0,"\xB10,00"),i(H.ogFloor,"+3,30"),i(H.attika,"+6,70"),s}fs.registerPlugin($t,Ou);var Op=new URLSearchParams(location.search),Tr=Op.get("still"),Jl=matchMedia("(prefers-reduced-motion: reduce)").matches||Op.has("ruhig"),ET=matchMedia("(pointer: coarse)").matches||innerWidth<760,ts=document.documentElement;Tr&&ts.classList.add("capture");Jl&&ts.classList.add("reduced");var wi=(s,t=document)=>t.querySelector(s),va=(s,t=document)=>[...t.querySelectorAll(s)],ho=s=>Math.min(1,Math.max(0,s)),Lp=s=>s*s*(3-2*s),_a=Cp();va("[data-num]").forEach(s=>{let t=s.dataset.num,e={wohn:_a.wohn,eg:_a.eg,og:_a.og,bgf:_a.bgf,terrasse:_a.terrasseVoll,dach:_a.dach}[t];e!=null&&(s.textContent=wr(e,s.dataset.dec?+s.dataset.dec:0))});function AT(){try{let s=document.createElement("canvas");return!!(s.getContext("webgl2")||s.getContext("webgl"))}catch{return!1}}var Fp=AT()&&!Op.has("ohne3d");Fp||ts.classList.add("no-webgl");var xa=wi("#scene"),sn,xs,Ge,rx=ET?{shadow:1024,farTrees:50,lamps:5,aniso:4,dprMax:1.5}:{shadow:2048,farTrees:110,lamps:7,aniso:8,dprMax:1.75},Yl=Math.min(devicePixelRatio||1,Tr?1:rx.dprMax),RT=new Fo(br.map(s=>new W(...s.p)),!1,"centripetal"),CT=new Fo(br.map(s=>new W(...s.t)),!1,"centripetal");function Dp(s){s=ho(s);let t=0;for(;t<br.length-2&&s>br[t+1].s;)t++;let e=br[t],n=br[t+1],i=ho((s-e.s)/(n.s-e.s)),r=(t+i)/(br.length-1);return{pos:RT.getPoint(r),tgt:CT.getPoint(r),tod:e.tod+(n.tod-e.tod)*i,fov:e.fov+(n.fov-e.fov)*Lp(i)}}function PT(s,t){if(t>=16/9)return s;let e=2*Math.atan(Math.tan(os.degToRad(s)/2)*(16/9)),n=os.radToDeg(2*Math.atan(Math.tan(e/2)/t));return Math.min(n,t<1?78:70)}function IT(){sn=new Hh({canvas:xa,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!!Tr}),sn.setPixelRatio(Yl),sn.outputColorSpace=Sn,sn.toneMapping=Qa,sn.shadowMap.enabled=!0,sn.shadowMap.type=Nr,sn.shadowMap.autoUpdate=!1,performance.mark("welt-start"),xs=Z_(sn,rx),performance.mark("welt-fertig"),Ge=new In(50,1,.05,2400),Bp()}function Bp(){if(!sn)return;let s=xa.clientWidth||innerWidth,t=xa.clientHeight||innerHeight;sn.setSize(s,t,!1),Ge.aspect=s/t,Ge.updateProjectionMatrix(),$l=!0}var co=0,_s=0,K_=-1,$l=!0,Np=!0;function Up(s){let t=Dp(s);Ge.position.copy(t.pos),Ge.lookAt(t.tgt),Ge.fov=PT(t.fov,Ge.aspect),Ge.updateProjectionMatrix(),xs.setTimeOfDay(t.tod),xs.setDoor(Lp(ho((s-zu.from)/(zu.to-zu.from)))),xs.setSlider(Lp(ho((s-ku.from)/(ku.to-ku.from))))}function LT(s){let t=ks[0];for(let e of ks)s>=e.from-.04&&(t=e);return t.stop}var DT=ks.map(s=>({c:s,el:document.getElementById(`ch-${s.id}`)})),ox=va(".room-nav button"),Q_=wi(".stage-progress span"),j_=wi("#hud-level"),Pp=wi("#hud-height"),tx=wi("#hud-needle"),ex=va(".stills img");function NT(s){let t=null;for(let{c:n,el:i}of DT){if(!i)continue;let r=n.id==="hero"?.035:.022,o=n.id==="hero"?1-ho((s-n.to+r)/r):Math.min(ho((s-n.from)/r),ho((n.to-s)/r));i.style.opacity=o.toFixed(3),i.style.transform=`translate3d(0, ${((1-o)*18).toFixed(1)}px, 0)`,i.style.visibility=o<.01?"hidden":"visible",o>.5&&(t=n.id)}let e=-1;if(ks.forEach((n,i)=>{s>=n.from-.03&&(e=i)}),ox.forEach(n=>{let i=n.dataset.chapter===ks[e]?.id;n.classList.toggle("on",i),i?n.setAttribute("aria-current","step"):n.removeAttribute("aria-current")}),Q_&&(Q_.style.transform=`scaleX(${s.toFixed(4)})`),ts.classList.toggle("past-hero",s>.03),!Fp&&ex.length){let n=ks[Math.max(0,e)].id;ex.forEach(i=>i.classList.toggle("on",i.dataset.chapter===n))}return t}function ax(){if(!Ge)return;let s=Ge.position.y,t=Ge.position.x>.1&&Ge.position.x<19.9&&Ge.position.z>.15&&Ge.position.z<11.3,e="Au\xDFen";if(t&&s<3.3?e="Erdgeschoss":t&&s<6.3?e="Obergeschoss":Ge.position.x<6&&Ge.position.x>0&&s>3.3&&s<7&&Ge.position.z>0&&Ge.position.z<10.5&&(e="Dachterrasse"),j_&&(j_.textContent=e),Pp){let n=s-(s>=3.3&&s<6.3&&e!=="Au\xDFen"?3.3:0),i=s;Pp.textContent=`${i>=0?"+":""}${wr(i,2)} m`,Pp.title=`Augenh\xF6he ${wr(n,2)} m \xFCber Fu\xDFboden`}if(tx){let n=new W;Ge.getWorldDirection(n);let i=Math.atan2(n.x,-n.z);tx.style.transform=`rotate(${-i*180/Math.PI}deg)`}}var Zl=null;function UT(){$t.config({ignoreMobileResize:!0}),!Jl&&!Tr&&(Zl=new W_({lerp:.085,wheelMultiplier:.9,smoothWheel:!0}),Zl.on("scroll",$t.update),fs.ticker.add(s=>Zl.raf(s*1e3)),fs.ticker.lagSmoothing(0),ts.classList.add("lenis")),$t.create({trigger:"#journey",start:"top top",end:"bottom bottom",onUpdate:s=>{co=s.progress}}),$t.create({trigger:"#after",start:"top bottom",end:"top top",onUpdate:s=>{Np=s.progress<.999,$l=$l||Np}}),$t.create({trigger:"#after",start:"top 64px",onToggle:s=>ts.classList.toggle("in-after",s.isActive)}),ox.forEach(s=>{s.addEventListener("click",()=>nx(s.dataset.chapter))}),va("[data-goto]").forEach(s=>s.addEventListener("click",t=>{t.preventDefault(),nx(s.dataset.goto)}))}function OT(s){let t=wi("#journey");return t.getBoundingClientRect().top+scrollY+s*(t.offsetHeight-innerHeight)}function nx(s){let t=ks.find(i=>i.id===s);if(!t)return;let e=s==="hero"?0:Math.max(t.stop,t.from+.03),n=OT(Math.min(e,.999));Zl?Zl.scrollTo(n,{duration:2.2,easing:i=>1-Math.pow(1-i,4)}):window.scrollTo({top:n,behavior:Jl?"auto":"smooth"})}var ix=performance.now(),lo=[];function FT(){let s=performance.now(),t=Math.min(.1,(s-ix)/1e3);if(ix=s,Jl){let e=LT(co);e!==_s&&(_s=e,sn&&(xa.classList.remove("cut"),xa.offsetWidth,xa.classList.add("cut")))}else{let e=1-Math.exp(-t*4.2);_s+=(co-_s)*e,Math.abs(co-_s)<2e-5&&(_s=co)}if(NT(co),sn&&Np&&($l||Math.abs(_s-K_)>5e-6)){let e=performance.now();Up(_s),sn.render(xs.scene,Ge),K_=_s,$l=!1,ax(),BT(performance.now()-e,t)}}var Ip=0;function BT(s,t){if(lo.push(t*1e3),lo.length>50&&lo.shift(),Ip--,lo.length<50||Ip>0)return;lo.reduce((n,i)=>n+i,0)/lo.length>30&&Yl>.8&&(Yl=Math.max(.75,Yl-.25),sn.setPixelRatio(Yl),Bp(),Ip=90,lo.length=0)}function zT(){let s=wi("#plan-host"),t=wi("#plan-info");if(!s)return;let e={},n=h=>{t&&(t.innerHTML=`<span class="mono">${h.f?"Anrechnung \xBC":"Raum"}</span><strong>${h.name}</strong><span>${wr(yr(h))} m\xB2</span>`)};["eg","og","dach"].forEach(h=>{let f=document.createElement("div");f.className="plan-view",f.dataset.level=h,f.appendChild($_(h,n)),s.appendChild(f),e[h]=f});let i={eg:wi("#rooms-eg"),og:wi("#rooms-og"),dach:wi("#rooms-dach")};for(let h of Object.keys(i)){let f=i[h];f&&vr[h].forEach(u=>{let d=document.createElement("li");d.innerHTML=`<span>${u.name}${u.f?" <em>(\xBC angerechnet)</em>":""}</span><span class="mono">${wr(yr(u)*(u.f??1))} m\xB2</span>`,d.addEventListener("mouseenter",()=>r(h,u.id,!0)),d.addEventListener("mouseleave",()=>r(h,u.id,!1)),f.appendChild(d)})}function r(h,f,u){let d=e[h]?.querySelector(`[data-id="${f}"]`);d&&d.classList.toggle("hl",u)}let o=va(".plan-tabs button"),a=h=>{o.forEach(f=>f.setAttribute("aria-selected",String(f.dataset.level===h))),Object.entries(e).forEach(([f,u])=>u.classList.toggle("on",f===h)),Object.entries(i).forEach(([f,u])=>u&&u.closest(".rooms-col").classList.toggle("on",f===h)),t&&(t.innerHTML='<span class="mono">Hinweis</span><strong>Raum antippen oder mit der Maus dar\xFCberfahren</strong>')};o.forEach(h=>h.addEventListener("click",()=>a(h.dataset.level))),o.forEach((h,f)=>h.addEventListener("keydown",u=>{if(u.key!=="ArrowRight"&&u.key!=="ArrowLeft")return;let d=o[(f+(u.key==="ArrowRight"?1:o.length-1))%o.length];d.focus(),a(d.dataset.level)})),a("eg");let l=wi("#elev-host");l&&l.appendChild(J_());let c={beton:()=>oo(512,{seed:7}),holz:()=>Fu(512,{base:[184,136,92],boards:5,seed:12,joints:!1,contrast:1.2}),eiche:()=>Fu(512,{base:[182,140,98],boards:4,seed:4})};va("[data-swatch]").forEach(h=>{let f=c[h.dataset.swatch];if(!f)return;let u=f();u.setAttribute("aria-hidden","true"),h.appendChild(u)})}function kT(){let s=wi(".hero-title");if(!s||Jl||Tr){ts.classList.add("intro-done");return}let t=new Ou(s,{type:"words,chars",wordsClass:"wd",charsClass:"ch"});fs.set(s,{opacity:1}),fs.from(t.chars,{yPercent:110,opacity:0,duration:1.4,ease:"expo.out",stagger:.045,delay:.15}),fs.from(".hero-meta > *",{y:16,opacity:0,duration:1.1,ease:"power3.out",stagger:.08,delay:.6}),fs.delayedCall(1.6,()=>ts.classList.add("intro-done"))}function GT(){let s=document.createElement("canvas");s.width=s.height=160;let t=s.getContext("2d"),e=t.createImageData(160,160);for(let n=0;n<e.data.length;n+=4){let i=Math.random()*255;e.data[n]=e.data[n+1]=e.data[n+2]=i,e.data[n+3]=22}t.putImageData(e,0,0),ts.style.setProperty("--grain",`url(${s.toDataURL()})`)}function sx(){if(GT(),zT(),Fp)try{IT()}catch(s){console.warn("3D nicht verf\xFCgbar:",s),ts.classList.add("no-webgl"),sn=null}if(Tr){let s=ks.find(e=>e.id===Tr),t=s?s.stop:parseFloat(Tr)||0;_s=co=t,sn&&(Up(t),xs.setTimeOfDay(Dp(t).tod,!0),sn.render(xs.scene,Ge),sn.render(xs.scene,Ge)),window.__ready=!0;return}UT(),addEventListener("resize",()=>{Bp(),$t.refresh()}),fs.ticker.add(FT),requestAnimationFrame(()=>{sn&&(xs.setTimeOfDay(Dp(0).tod,!0),Up(0),sn.render(xs.scene,Ge),performance.mark("erstes-bild"),ax()),ts.classList.add("ready"),(document.fonts?document.fonts.ready:Promise.resolve()).then(kT),window.__ready=!0})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",sx):sx();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.15.1
   * https://gsap.com
   *
   * Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/SplitText.js:
  (*!
   * SplitText 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle
  *)
*/
