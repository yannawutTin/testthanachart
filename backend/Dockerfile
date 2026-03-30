# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5059

ENV ASPNETCORE_URLS=http://+:5059
ENV ASPNETCORE_ENVIRONMENT=Production 

USER app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

# Copy project file and restore dependencies
COPY ["stockapi/stockapi.csproj", "stockapi/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
RUN dotnet restore "stockapi/stockapi.csproj"

# Copy source files and build
COPY stockapi/ ./stockapi/
COPY Infrastructure/ ./Infrastructure/
COPY Application/ ./Application/
COPY Domain/ ./Domain/

WORKDIR /src/stockapi
RUN dotnet build "stockapi.csproj" -c $configuration -o /app/build

# Publish stage
FROM build AS publish
ARG configuration=Release
RUN dotnet publish "stockapi.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# Final runtime stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Entry point for the application
ENTRYPOINT ["dotnet", "stockapi.dll"]
