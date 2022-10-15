module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        gray: "#ABB8C3",
        "light-gray": "#F9F9FB",
        cg: "#6B7280",
        ltb: "#F3F4F6",
        "button-color": "#173B3F",
        "bulk-email": "#DDE0E3",
        "black-text": "#1F2A37",
        "row-gray": "#F9FAFB",
        bdr: "#E5E7EB",
        dots: "#6B7280",
        white: "#FFFFFF",
        black: "#000000",
      },
      fontSize: {
        fb: '14px'
      },
      borderRadius: {
        "bt-rd": "8px"
      },
      padding: {
        '5px': '5.5px',
        '4px': '4.5px',
      }


    },
    plugins: [],
  },
};
