FROM ubuntu:24.04

USER root
RUN apt-get update && apt-get install -y \
    git \
    ripgrep \
    curl \
    iputils-ping \
    unzip \
    xz-utils \
    && rm -rf /var/lib/apt/lists/*
ENV PATH="/root/.local/bin:${PATH}"
RUN curl -fsSL https://antigravity.google/cli/install.sh | bash

WORKDIR /app
ENTRYPOINT ["agy"]
