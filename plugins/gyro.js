/*
	krpano 1.18.2 gyro plugin (build 2014-12-18)

	for devices with a gyro sensor

	by Aldo Hoeben / fieldOfView.com
	contributions by
		Sjeiti / ronvalstar.nl
		Klaus Reinfeld / krpano.com

	http://github.com/fieldOfView/krpano_fovplugins/tree/master/gyro/
	http://krpano.com/plugins/userplugins/fieldofview/gyro/

	This software can be used free of charge and the source code is available
	under a Creative Commons Attribution license:
		http://creativecommons.org/licenses/by/3.0/
*/
var krpanoplugin=function(){function Z(e){return String("yesontrue1")[n](String(e)[r]())>=0}function et(){W=t,X=e;if(B===undefined){j=o;return}if(B&&!j){if(!P[f]||!P.chrome)window[l](h,bt,o),D[v][d][l](m,mt,o),D[v][d][l](g,gt,o),D[v][d][l](y,gt,o);j=o,V=-yt(),$=0,J=0,K=0,Q=D[b][u],z=D[E][w],D[E][w]=o}else j=t}function tt(){B&&j&&(window[p](h,bt,o),D[v][d][p](m,mt),D[v][d][p](g,gt),D[v][d][p](y,gt)),q&&D.call("tween(view.camroll,0)"),j=t,z!=e&&(D[E][w]=z,z=e)}function nt(){j?tt():et()}function rt(e){e=e*Math.PI/180;var t=Math.cos(e),n=Math.sin(e);return[1,0,0,0,t,n,0,-n,t]}function it(e){e=e*Math.PI/180;var t=Math.cos(e),n=Math.sin(e);return[t,0,-n,0,1,0,n,0,t]}function st(e){e=e*Math.PI/180;var t=Math.cos(e),n=Math.sin(e);return[t,n,0,-n,t,0,0,0,1]}function ot(e,t){var n=new Array(9),r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=t[6],l=t[7],c=t[8],h=e[0],p=e[1],d=e[2];return n[0]=h*r+p*o+d*f,n[1]=h*i+p*u+d*l,n[2]=h*s+p*a+d*c,h=e[3],p=e[4],d=e[5],n[3]=h*r+p*o+d*f,n[4]=h*i+p*u+d*l,n[5]=h*s+p*a+d*c,h=e[6],p=e[7],d=e[8],n[6]=h*r+p*o+d*f,n[7]=h*i+p*u+d*l,n[8]=h*s+p*a+d*c,n}function ut(e){var t,n,r;return e[3]>.9999?(t=Math[S](e[2],e[8]),n=Math.PI/2,r=0):e[3]<-0.9999?(t=Math[S](e[2],e[8]),n=-Math.PI/2,r=0):(t=Math[S](-e[6],e[0]),r=Math[S](-e[5],e[4]),n=Math.asin(e[3])),{pan:t*180/Math.PI,tilt:n*180/Math.PI,roll:r*180/Math.PI}}function at(e,t){var n=Math[x](e-t),r=Math[x](e-360-t),i=Math[x](e+360-t);return r<n&&r<i?e-360:i<n&&i<r?e+360:e}function ft(e){e+=360180;var t=e|0;return t%360+(e-t)-180}function dt(e){var n=e.accelerationIncludingGravity,r=e.rotationRate;if(n&&r){B===undefined&&(B=o,D.call(H[a],H));if(!j)return;var i=0;if(e.interval>0)i=Number(e.interval)/1e3;else if(window[T]&&window[T].now){var s=window[T].now();lt>0&&(i=s-lt),lt=s}var u=yt(),f=Number(n.x),l=Number(n.y),c=Number(n.z),h=Number(r[N]),p=Number(r.beta),d=Number(r.gamma),v=Number(D.get(C)),m=Number(D.get(k)),g=Number(D.get(L)),y=v,b=m,w=g,E=.1,O=Math[S](c,l)*180/Math.PI;O=at(O,ht),ht=ft(ht*(1-E)+O*E);var M=Math[S](c,f)*180/Math.PI;M=at(M,ct),ct=ft(ct*(1-E)+M*E);if(q){var _=-Math[S](f,l)*180/Math.PI;_=at(_,pt),pt=pt*(1-E)+_*E}else pt=0;var P=st(-ht),F=rt(-ct+90),R=rt(-pt),U=ot(ot(F,P),R),z=ut(U),W=z.tilt,X=t;Math[x](Math[x](b)-W)<45&&(X=o,b<0&&(W=-W)),q?w=pt+u:w=0;if(I==t&&X){var V=W-b;V>10?V=10:V<-10&&(V=-10),b+=V*.1}var $=ot(ot(it(-y),st(-b)),rt(-w));$=ot($,rt(+u)),$=ot($,it(p*180/Math.PI*i)),$=ot($,st(h*180/Math.PI*i)),$=ot($,rt(-u));var J=ut($);y=J.pan,b=J.tilt,w=J[A],D.set(C,y),D.set(k,b),D.set(L,w)}}function vt(e){window[p](h,vt,t),B=o,j&&(j=t,et()),D.call(H[a],H)}function mt(e){U=o}function gt(e){U=t}function yt(){var e=Number.NaN,t=screen.width>screen.height,s=screen[O]||screen.msOrientation||screen.mozOrientation;if(s){s=(""+s)[r]();var o=s[n]("portrait")>=0,u=s[n]("landscape")>=0,a=s[n]("primary")>=0,f=s[n]("secondary")>=0;o&&a?e=0:u&&a?e=90:u&&f?e=-90:o&&f&&(e=180),!isNaN(e)&&!D[i].mobile&&(e-=90)}return isNaN(e)&&(e=D._have_top_access?top[O]:window[O]),isNaN(e)&&(D[i].mobile?e=t?90:0:e=t?0:90),e}function bt(t){if(!U&&j){var n=yt(),r=wt({yaw:t[N]*Y,pitch:t.beta*Y,roll:t.gamma*Y}),i=Et(r.yaw/Y),s=r[M]/Y,a=i,f,l=D[b].hlookat,c=D[b].vlookat,h=D[b][u],p=l-J,d=c-K;if(!W){if(X==e)X=r;else if(r.yaw!=X.yaw||r[M]!=X[M]||r[A]!=X[A])X=e,W=o,I&&($=-s);return}q&&(Q=Et(180+Number(n)-r[A]/Y));if(Math[x](s)>70){a=t[N];switch(n){case 0:s>0&&(a+=180);break;case 90:a+=90;break;case-90:a+=-90;break;case 180:s<0&&(a+=180)}a=Et(a),Math[x](a-i)>180&&(a+=a<i?360:-360),f=Math.min(1,(Math[x](s)-70)/10),i=i*(1-f)+a*f,Q*=1-f}V+=p,$+=d,Math[x](s+$)>90&&($=s+$>0?90-s:-90-s),J=Et(-i-180+V),K=Math.max(Math.min(s+$,90),-90),Math[x](J-l)>180&&(l+=J>l?360:-360),J=(1-R)*J+R*l,K=(1-R)*K+R*c,Math[x](Q-h)>180&&(h+=Q>h?360:-360),Q=(1-R)*Q+R*h;var m=Et(J),g=K,y=Et(Q);isNaN(m)||(D[b].hlookat=m),isNaN(g)||(D[b].vlookat=g),isNaN(y)||(D[b][u]=y),$!=0&&F>0&&(d==0?F==1?($=0,G=0):(G=1-(1-G)*D[v].touchfriction,$*=1-Math.pow(F,2)*G,Math[x]($)<.1&&($=0,G=0)):G=0)}}function wt(e){var t,n,r,i=Math.cos(e.yaw),s=Math.sin(e.yaw),o=Math.cos(e[M]),u=Math.sin(e[M]),a=Math.cos(e[A]),f=Math.sin(e[A]),l=[s*f-i*u*a,-i*o,i*u*f+s*a,o*a,-u,-o*f,s*u*a+i*f,s*o,-s*u*f+i*a];return l[3]>.9999?(t=Math[S](l[2],l[8]),r=Math.PI/2,n=0):l[3]<-0.9999?(t=Math[S](l[2],l[8]),r=-Math.PI/2,n=0):(t=Math[S](-l[6],l[0]),n=Math[S](-l[5],l[4]),r=Math.asin(l[3])),{yaw:t,pitch:r,roll:n}}function Et(e){return e%=360,e<=180?e:e-360}var e=null,t=!1,n="indexOf",r="toLowerCase",i="device",s="registerattribute",o=!0,u="camroll",a="onavailable",f="android",l="addEventListener",c="devicemotion",h="deviceorientation",p="removeEventListener",d="layer",v="control",m="touchstart",g="touchend",y="touchcancel",b="view",w="loadwhilemoving",E="display",S="atan2",x="abs",T="performance",N="alpha",C="view.hlookat",k="view.vlookat",L="view.camroll",A="roll",O="orientation",M="pitch",_=this,D=e,P=e,H=e,B=undefined,j=t,F=0,I=t,q=t,R=.5,U=t,z=e,W=t,X=e,V=0,$=0,J=0,K=0,Q=0,G=0,Y=Math.PI/180;_.registerplugin=function(p,d,v){D=p,H=v;if(D.version<"1.18"){D.trace(3,"gyro plugin - too old krpano version (min. 1.18)");return}P=D[i],H[s]("available",t,function(e){},function(){return B==o?o:t}),H[s]("enabled",o,function(e){Z(e)?et():tt()},function(){return j}),H[s]("velastic",0,function(e){F=Math.max(Math.min(Number(e),1),0)},function(){return F}),H[s]("vrelative",t,function(e){I=Z(e)},function(){return I}),H[s](u,o,function(e){q=Z(e)},function(){return q}),H[s]("friction",0,function(e){R=Math.max(Math.min(Number(e),1),0)},function(){return R}),H[s](a,e),H.enable=et,H.disable=tt,H.toggle=nt;var m=P[f]&&(""+navigator.userAgent)[r]()[n]("ucbrowser")>0;P[f]&&P.chrome?window[l](c,dt,t):(!P.androidstock||!!m)&&(!D[i].realDesktop||P.ie||m)&&window[l](h,vt,t)},_.unloadplugin=function(){window[p](c,dt,t),window[p](h,vt,t),window[p](h,bt,t),tt(),H=e,P=e,D=e};var lt=0,ct=0,ht=0,pt=0};