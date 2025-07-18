import requests

BASE_URL = "https://clinicaltrials.gov/api/v2/studies"

def fetch_clinical_trials(condition: str, location: str, max_results: int = 5) -> list:
    params = {
        "format": "json",
        "query.cond": condition,
        "query.locn": location,
        "pageSize": str(max_results)
    }

    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    data = response.json()

    studies = data.get("studies", [])
    trials = []

    for study in studies:
        protocol = study.get("protocolSection", {})
        id_module = protocol.get("identificationModule", {})
        status_module = protocol.get("statusModule", {})
        description_module = protocol.get("descriptionModule", {})

        nct_id = id_module.get("nctId")
        title = id_module.get("briefTitle")
        status = status_module.get("overallStatus")
        summary = description_module.get("briefSummary")

        trials.append({
            "nctId": nct_id,
            "title": title,
            "status": status,
            "summary": summary,
            "link": f"https://clinicaltrials.gov/ct2/show/{nct_id}"
        })

    return trials
