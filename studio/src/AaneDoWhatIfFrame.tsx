import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Hero,LOOKS,basePose,Pose,joints,toWorld,limbSpread,KitDefs,SetDefs,makeRoom,RoomShell,BackWindow,FloorPlant,WallFrame,LightVeil,Glow,Cone,Dust,Foreground,WallTexture} from './engine';

// Built in the installed kelano86/what-if-animation studio with its real rig and lighting kit.
const room=makeRoom({x:960,y:420},{x0:390,x1:1570,y0:145,y1:744},3.4);
const rad=(a:number)=>a*Math.PI/180;
const arm=(side:number,root:{x:number;y:number},target:{x:number;y:number},bend:number)=>{
 const dx=(target.x-root.x)*side,dy=target.y-root.y;const b=bend*Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-62*62-58*58)/(2*62*58))));
 return {a:(Math.atan2(dx,dy)-Math.atan2(58*Math.sin(b),62+58*Math.cos(b)))*180/Math.PI,b:b*180/Math.PI};
};
const yaw=-.22,spread=limbSpread(yaw);
const pose:Pose={...basePose,x:1200,y:740,scale:1.5,yaw,look:-.35,headTilt:-5,expr:'worried',tilt:0,legL:{a:-9,b:4},legR:{a:8,b:-3},armL:arm(-1,{x:-42*spread+yaw*6,y:-108},{x:-24,y:-39},-1),armR:arm(1,{x:42*spread+yaw*6,y:-108},{x:98,y:-68},1)};
const js=joints(pose);
const palm=(which:'armL'|'armR')=>{const j=js[which],dx=j.end.x-j.mid.x,dy=j.end.y-j.mid.y,n=Math.hypot(dx,dy);return toWorld(pose,{x:j.end.x+dx/n*10,y:j.end.y+dy/n*10})};
const left=palm('armL'),right=palm('armR');
const guitarAngle=Math.atan2(right.y-left.y,right.x-left.x)*180/Math.PI+90;
const guitarScale=Math.hypot(right.x-left.x,right.y-left.y)/153;

const Guitar=()=> <g transform={`translate(${left.x} ${left.y}) rotate(${guitarAngle}) scale(${guitarScale}) translate(0 22)`} filter="url(#rimR)" stroke="#211C29" strokeWidth={2.6} strokeLinejoin="round">
 <path d="M-20-101Q-58-119-68-85Q-78-57-55-33Q-41-14-63 12Q-91 44-68 80Q-44 114 2 112Q49 114 73 80Q95 43 65 12Q46-10 53-34Q72-65 57-89Q43-113 20-101Z" fill="#BD8A49"/>
 <path d="M-21-94Q-52-109-60-81Q-67-57-47-32Q-34-12-55 18Q-80 47-60 75Q-39 102 2 102Q42 103 62 74Q80 45 53 18Q32-8 43-37Q60-64 47-83Q34-104 18-94Z" fill="#D5AD69" stroke="#ECC98F" strokeWidth={1.5}/>
 <path d="M-11-102L-11-231H11L12-103Z" fill="#68432F"/><path d="M-18-231L-20-270Q0-280 19-268L20-231Z" fill="#A17140"/>
 {[-258,-246,-234].map(y=><g key={y}><path d={`M-19 ${y}h-10M19 ${y}h10`} stroke="#ADAB9B" strokeWidth={2.3}/><ellipse cx={-30} cy={y} rx={3.5} ry={2.8} fill="#D5CCB0" strokeWidth={1}/><ellipse cx={30} cy={y} rx={3.5} ry={2.8} fill="#D5CCB0" strokeWidth={1}/></g>)}
 {Array.from({length:10},(_,i)=>{const y=-221+121*(1-Math.pow(.83,i));return <path key={i} d={`M-11 ${y}H11`} stroke="#C0AF8E" strokeWidth={1}/>})}
 <circle cy={-45} r={29} fill="#483222"/><circle cy={-45} r={33} fill="none" stroke="#9B6C38" strokeWidth={1.4}/><circle cy={-45} r={36} fill="none" stroke="#F4D19B" strokeWidth={1.2}/>
 <path d="M15-7Q37-11 39 13L25 34L13 15Z" fill="#825035"/><path d="M-25 47H26V61H-25Z" fill="#64402B"/>
 {[-5,-3,-1,1,3,5].map(x=><path key={x} d={`M${x}-267V56`} stroke="#EEE0BB" strokeWidth={.7} opacity={.9}/>)}
 <path d="M-43 74Q-20 92 5 89" fill="none" stroke="#E8BE7E" strokeWidth={1.3}/>
 </g>;

const Stage=()=> <g>
 <RoomShell r={room} id="aanedo" floor="boards" wall="#53504E" side="#363943" floorC="#483932" ceiling="#22232E" lines="#322C2D"/>
 <BackWindow r={room} id="aanedo-window" t={92} x0={470} x1={795} y0={230} y1={565} sun={{x:746,y:522}} cols={2} curtains/>
 <WallFrame x={872} y={253} w={164} h={211} art={1}/>
 <WallFrame x={1094} y={252} w={123} h={153} art={2}/>
 <FloorPlant r={room} u={.12} w={.35} size={.8}/>
 <g stroke="#241F29" strokeWidth={3.3} strokeLinejoin="round" strokeLinecap="round">
 <path d="M515 822L1538 805L1758 1014L351 1040Z" fill="#846146"/><path d="M351 1040L1758 1014V1070L350 1091Z" fill="#49352F"/><path d="M363 1045L1745 1022" stroke="#B88A58" strokeWidth={4}/>
 {[611,792,977,1163,1355,1533].map(x=><path key={x} d={`M${x} 1031L${960+(x-960)*.61} 815`} stroke="#553F33" strokeWidth={2} opacity={.75}/>)}
 <path d="M438 619L668 617L697 837L413 850Z" fill="#292B37"/><path d="M454 640L651 637L675 822L436 833Z" fill="#1C2330"/>
 {Array.from({length:9},(_,i)=><path key={i} d={`M${449+i*25} 650l-7 171`} stroke="#53545C" strokeWidth={1.8} opacity={.5}/>)}
 <circle cx={552} cy={726} r={56} fill="none" stroke="#41434F" strokeWidth={3}/><circle cx={549} cy={728} r={27} fill="#252834" stroke="#52515B" strokeWidth={2}/>
 <path d="M682 743L742 738L756 771L692 779Z" fill="#574638"/><path d="M692 779L756 771V796L692 804Z" fill="#342A28"/>
 <path d="M838 839L922 836L950 870L817 876Z" fill="#5C4739"/><path d="M836 875L826 978M926 871L942 974" fill="none" stroke="#382C29" strokeWidth={6}/>
 <path d="M1456 0V171" stroke="#1A1C27" strokeWidth={5}/>
 <g transform="translate(1456 182) rotate(24)"><path d="M-65-20L41-28L60 29L-52 37Z" fill="#3B3B43"/><ellipse cx={-2} cy={32} rx={56} ry={12} fill="#F3C788" stroke="#C78A49"/><path d="M-48-17L-39 20M-23-21L-14 20M4-23L11 19M31-24L37 18" stroke="#68616A" strokeWidth={3}/></g>
 <path d="M855 223Q1174 273 1509 231" fill="none" stroke="#2D2B34" strokeWidth={2}/>
 {Array.from({length:10},(_,i)=>{const x=871+i*68,y=228+Math.sin(i/9*Math.PI)*21;return <g key={i}><circle cx={x} cy={y} r={4.6} fill="#FFE1AD" stroke="none"/><Glow x={x} y={y} r={32} o={.17}/></g>})}
 </g>
 <Cone d="M1425 212L1022 951L1496 929L1493 211Z" o={.3}/>
 <WallTexture rect={[390,145,1180,599]}/>
 <LightVeil id="aanedo-contrast" lights={[[746,522,485],[1456,215,570],[1240,637,460]]} o={.53}/>
 <Glow x={746} y={516} r={520} o={.24}/><Glow x={1456} y={215} r={420} o={.35}/>
 <Dust t={92} seed={37} x0={1040} y0={271} w={420} h={566} n={28} o={.35}/>
 </g>;

export const AaneDoWhatIfFrame=({view='wide'}:{view?:'wide'|'close'|'detail'})=> <AbsoluteFill style={{background:'#171520'}}><svg width="100%" height="100%" viewBox={view==='close'?'920 315 730 410.625':view==='detail'?'995 580 510 286.875':'0 0 1920 1080'}>
 <KitDefs/><SetDefs/>
 <defs><radialGradient id="aanedo-vig"><stop offset=".45" stopColor="#100F1E" stopOpacity={0}/><stop offset="1" stopColor="#100F1E" stopOpacity={.52}/></radialGradient><filter id="aanedo-grain"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves={2} seed={38}/><feColorMatrix type="saturate" values="0"/></filter></defs>
 <Stage/>
 <Hero pose={pose} look={LOOKS.pipHood} rimId="rimR" shadow={.65}/>
 <Guitar/>
 <clipPath id="aanedo-hand-contact"><circle cx={left.x} cy={left.y} r={32}/><circle cx={right.x} cy={right.y} r={32}/></clipPath>
 <g clipPath="url(#aanedo-hand-contact)"><Hero pose={pose} look={LOOKS.pipHood} rimId="rimR" shadow={0}/></g>
 <g stroke="#272632" strokeWidth={5.5} strokeLinecap="round" fill="none"><path d="M1063 999V614L1110 532"/><path d="M1063 999L997 1045M1063 999L1133 1034M1063 999L1061 1055"/><path d="M1112 532Q1074 677 1090 902Q1096 1041 1399 1007" strokeWidth={2.8}/></g>
 <g transform="translate(1139 522) rotate(-9)" stroke="#1B1F2D" strokeWidth={2.5}><rect x={-40} y={-13} width={79} height={26} rx={12} fill="#5A6068"/><rect x={-40} y={-12} width={28} height={24} rx={3} fill="#93998F"/>{[-34,-28,-22].map(x=><path key={x} d={`M${x}-9V9`} stroke="#4C535C" strokeWidth={1.4}/>)}<path d="M-4-7H25" stroke="#B5B3A2" strokeWidth={1}/></g>
 <Foreground blur={3}><Hero look={LOOKS.mo} pose={{...basePose,x:491,y:1055,scale:1.35,yaw:.4,headTilt:7,look:.8,expr:'happy',armL:{a:10,b:-60},armR:{a:20,b:-65}}} rimId="rimR" shadow={0}/></Foreground>
 <Foreground blur={10}><path d="M-80 1080V897Q-43 815 41 808Q137 813 161 898L196 1080Z" fill="#101725"/><ellipse cx={40} cy={786} rx={77} ry={96} fill="#11151E"/><path d="M1525 1080L1547 951Q1580 869 1669 869Q1766 880 1791 968L1819 1080Z" fill="#141720"/><ellipse cx={1670} cy={840} rx={77} ry={91} fill="#15141C"/></Foreground>
 <rect width={1920} height={1080} filter="url(#aanedo-grain)" opacity={.035} style={{mixBlendMode:'soft-light'}}/><rect width={1920} height={1080} fill="url(#aanedo-vig)"/>
 </svg></AbsoluteFill>;
