// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Token is ERC721URIStorage, Ownable {

    uint private _counter;

    uint8 private UNDECIDED = 0;
    uint8 private USER = 1; 
    uint8 private COMPANY = 2;

    mapping(uint256=>bool) private _SBTissued;
    mapping(address=>uint8) private _addressToRole;

    constructor() ERC721("Soul Bound Review Token", "SBRT") Ownable(msg.sender) {
        _counter = 0;
    }

    function _generateSecret(address user, address companyId, uint serviceId) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(user, companyId, serviceId)));
    }

    function _getCounterAndIncrement() internal returns (uint256) {
        return _counter++;
    }

    // Function to mint a new token, only storing metadata URI
    function mintToken(address _user, address _companyId, uint _serviceId, string memory _metadataURI) external {
        uint256 secret = _generateSecret(_user, _companyId, _serviceId);
        require(!_SBTissued[secret], "SBT can be issued only once to a user and service combination1");
        require(_addressToRole[_user] != COMPANY, "User can't act as a company!");
        require(_addressToRole[_companyId] != USER, "Company can't act as a user!");

        uint256 userTokenId = _getCounterAndIncrement();
        uint256 companyTokenId = _getCounterAndIncrement();

        _safeMint(_user, userTokenId);
        _setTokenURI(userTokenId, _metadataURI);
        _addressToRole[_user] = USER;

        _safeMint(_companyId, companyTokenId);
        _setTokenURI(companyTokenId, _metadataURI);
        _addressToRole[_companyId] = COMPANY;
    }

    function ownerOfTokenIds(address tokenOwner) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](balanceOf(tokenOwner));
        uint256 index = 0;
        for (uint256 i = 0; i < _counter; i++) {
            if (ownerOf(i) == tokenOwner) {
                result[index] = i;
                index++;
            }
        }
        return result;
    }

    // Function to check if a token exists
    function _exists(uint256 _tokenId) internal view returns (bool) {
        return (_ownerOf(_tokenId) != address(0));
    }

    // Override transfer functions to ensure non-transferability
    function transferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721, IERC721) {
        require(false,"Non-transferable token");
        from = from;
        to = to;
        tokenId = tokenId;
    }

    function approve(address to, uint256 tokenId) public virtual override(ERC721, IERC721) {
        require(false,"Non-transferable token");
        to = to;
        tokenId = tokenId;
    }

    function setApprovalForAll(address operator, bool approved) public virtual override(ERC721, IERC721) {
        require(false,"Non-transferable token");
        operator = operator;
        approved = approved;
    }
}