export default function BottleWithWater() {
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
    const progress = 50;
    const fillTopY = 20;
    const fillBottomY = 380;
    const fillHeight = fillBottomY - fillTopY;
    const levelY = fillBottomY - (fillHeight * progress) / 100;

    return (
        <div
            style={{
                background: "#0D0D10",
                display: "inline-block",
            }}
        >
            <svg
                viewBox={`0 0 ${vb.w} ${vb.h}`}
                style={{ display: "block", width: 200, height: "auto" }}
            >
                <defs>
                    <clipPath id="bottle-clip" clipPathUnits="userSpaceOnUse">
                        <path d={bottlePath} />
                    </clipPath>
                </defs>

                {/* Water */}
                <rect
                    x="0"
                    y={levelY}
                    width={vb.w}
                    height={fillBottomY - levelY}
                    fill="#3BA2FF"
                    clipPath="url(#bottle-clip)"
                />

                {/* Bottle outline */}
                <path
                    d={bottlePath}
                    fill="none"
                    stroke="white"
                    strokeWidth={3}
                />
            </svg>
        </div>
    );
}
