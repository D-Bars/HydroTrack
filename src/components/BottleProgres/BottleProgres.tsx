import cl from "./BottleProgress.module.scss"

type BottleWithWaterProps = {
    progress: number;
};

export default function BottleWithWater({ progress }: BottleWithWaterProps) {
    const vb = { w: 200, h: 400 };

    const bottlePath = `
    M80,20 
    h40 
    c8,0 10,8 10,14 
    v16 
    c22,10 40,34 40,70 
    v170 
    c0,40 -30,70 -70,70 
    s-70,-30 -70,-70 
    V120 
    c0,-36 18,-60 40,-70 
    V34 
    c0,-6 2,-14 10,-14 
    z
  `;

    // lvl water %
    const percent = Math.min(100, Math.max(0, progress));
    const fillTopY = 20;
    const fillBottomY = 380;
    const fillHeight = fillBottomY - fillTopY;

    const levelY = fillBottomY - (fillHeight * percent) / 100;

    return (
        <div className={cl.bottle__mask}>
            <svg className={cl.bottle} viewBox={`0 0 ${vb.w} ${vb.h}`}>
                <defs>
                    <clipPath id="bottle-clip" clipPathUnits="userSpaceOnUse">
                        <path d={bottlePath} />
                    </clipPath>
                    <linearGradient id="water-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6EC7FF" />
                    </linearGradient>
                </defs>

                {/* Water */}
                <g clipPath="url(#bottle-clip)">
                    <rect
                        className={cl.water__fill}
                        x="0"
                        y={levelY}
                        width={vb.w}
                        height={fillBottomY - levelY}
                        fill="url(#water-gradient)"
                    />

                    <g
                        className={cl.wave__wrapper}
                        style={{
                            transform: `translateY(${levelY - 12}px)`,
                        }}
                    >
                        <path
                            className={cl.wave}
                            d="M -220 0 Q -170 20 -120 0 T -20 0 T 80 0 T 180 0 T 280 0 V200 H -220 Z"
                        />
                        <path
                            className={`${cl.wave} ${cl.wave__secondary}`}
                            d="M -240 10 Q -190 -5 -140 10 T -40 10 T 60 10 T 160 10 T 260 10 V200 H -240 Z"
                        />
                    </g>
                </g>

                {/* Bottle outline */}
                 <path d={bottlePath} fill="none" stroke="white" strokeWidth={3} />
            </svg>
        </div>
    );
}
