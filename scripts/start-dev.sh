#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color
BOLD='\033[1m'

echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║${NC}          ${BOLD}Starting Nx Module Federation App${NC}              ${CYAN}║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📦 Starting Host and Remote MFEs in parallel...${NC}"
echo ""
echo -e "${BLUE}Remote MFEs will start on:${NC}"
echo -e "  • products:      http://localhost:4201"
echo -e "  • cart:          http://localhost:4202"
echo -e "  • profile:       http://localhost:4203"
echo -e "  • orders:        http://localhost:4204"
echo -e "  • analytics:     http://localhost:4205"
echo -e "  • notifications: http://localhost:4206"
echo ""
echo -e "${YELLOW}⏳ Please wait for all services to compile...${NC}"
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo ""

# Run nx serve and capture output, looking for "All remotes started"
npx nx serve mfeui 2>&1 | while IFS= read -r line; do
  echo "$line"
  
  # Check if this is the "All remotes started" line
  if [[ "$line" == *"All remotes started, server ready at"* ]]; then
    # Print a prominent banner AFTER the Nx message
    echo ""
    echo -e "${GREEN}╔═════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                                 ║${NC}"
    echo -e "${GREEN}║${NC}  ${BOLD}${GREEN}✅ ALL SERVICES READY!${NC}                                        ${GREEN}║${NC}"
    echo -e "${GREEN}║                                                                 ║${NC}"
    echo -e "${GREEN}║${NC}  ${BOLD}Open your browser:${NC}                                          ${GREEN}║${NC}"
    echo -e "${GREEN}║                                                                 ║${NC}"
    echo -e "${GREEN}║${NC}      👉  ${BOLD}${YELLOW}http://localhost:4200${NC}  👈                            ${GREEN}║${NC}"
    echo -e "${GREEN}║                                                                 ║${NC}"
    echo -e "${GREEN}║${NC}  ${RED}⚠️  DO NOT use ports 4201-4206 (they are remotes)${NC}           ${GREEN}║${NC}"
    echo -e "${GREEN}║                                                                 ║${NC}"
    echo -e "${GREEN}╚═════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
  fi
done

# This runs after user stops the server
echo ""
echo -e "${YELLOW}👋 Development server stopped${NC}"
echo ""
